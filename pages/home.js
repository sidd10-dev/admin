import Navbar from "../components/navbar"
import styles from "../styles/home.module.css"
import Donors from "../components/donorsComponent"
import Donations from "../components/donationsComponent"
import { useEffect, useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import Link from "next/link"

const Home = () => {
  const [cookie, setCookie] = useCookies()
  const [topDonations, setTopDonations] = useState([])
  const [recentDonations, setRecentDonations] = useState([])
  useEffect(async () => {
    try {
      const td = await axios.get("http://localhost:3001/api/topDonations", {
        headers: {
          authorization: cookie.user
        }
      })
      // console.log(td.data)
      await setTopDonations(prev => {
        return td.data
      })
      const rd = await axios.get("http://localhost:3001/api/recentDonations", {
        headers: {
          authorization: cookie.user
        }
      })
      await setRecentDonations(prev => {
        return rd.data
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  return (<>
    <Navbar />
    <div className={styles['home-container']}>

      <Link href="/donors">
        <div className={styles['home-donors']}>
          <div className={styles['home-header']}> DONORS </div>
          <Donors />
        </div>
      </Link>

      <div className={styles['donations-container']}>
        <div className={styles['home-recent-donations']}>
          <div className={styles['home-header']}> RECENT DONATIONS </div>
          <Donations donationData={recentDonations} />
        </div>
        <div className={styles['home-top-donations']}>
          <div className={styles['home-header']}> TOP DONATIONS </div>
          <Donations donationData={topDonations} />
        </div>
      </div>
    </div>
  </>)
}

export default Home