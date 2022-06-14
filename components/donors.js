import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import styles from '../styles/donors.module.css'
import Table from './table'

const Donors = () => {
  const [cookie, setCookie, removeCookie] = useCookies()
  const [donors, setDonors] = useState()

  useEffect(async () => {
    try {
      const donorsRes = await axios.get('http://localhost:3001/api/donors', {
        headers: {
          authorization: cookie.user
        }
      })
      console.log(donorsRes)
      await setDonors(donorsRes.data)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div className={styles['donors-container']}>
      <Table tableHeads={[
        "ID",
        "Name",
        "Mobile Number",
        "Date of birth",
        ""
      ]} tableData={donors} button={true} />
    </div >
  )
}

export default Donors