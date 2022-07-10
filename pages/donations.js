import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import styles from '../styles/donations.module.css'
import Navbar from '../components/navbar'
import DonationsComponent from '../components/donationsComponent'
import Table from '../components/table'
import axios from 'axios'

const Donations = (props) => {
  const [recentDonations, setRecentDonations] = useState([])

  const [topDonations, setTopDonations] = useState([])

  const [cookie, setCookie] = useCookies()

  useEffect(async () => {
    try {
      console.log("hi")
      const td = await axios.get("http://localhost:3001/api/topDonations", {
        headers: {
          authorization: cookie.user
        }
      })
      // console  .log(td.data)
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

  return (
    <div>
      <Navbar />
      <div className={styles['donations-page-container']}>
        <div className={styles['donations-page-recent-donations']}>
          <div className={styles['donations-page-header']}> RECENT DONATIONS </div>
          <div className={styles['donations-page-table']}>
            <Table tableHeads={[
              "ID",
              "Donated By",
              "Amount",
            ]} tableData={recentDonations}></Table>
          </div>
        </div>
        <div className={styles['donations-page-top-donations']}>
          <div className={styles['donations-page-header']}> TOP DONATIONS </div>
          <div className={styles['donations-page-table']}>
            <Table tableHeads={[
              "ID",
              "Donated By",
              "Amount",
            ]} tableData={topDonations}></Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donations
