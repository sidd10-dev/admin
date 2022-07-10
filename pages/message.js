import Navbar from '../components/navbar'
import styles from '../styles/message.module.css'
import Table from '../components/table'
import Button from '../components/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Message = (props) => {
  const [familyData, setFamilyData] = useState([])
  const [cookie] = useCookies()

  useEffect(async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getfamilydata', {
        headers: {
          authorization: cookie.user
        }
      })
      setFamilyData(res.data)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className={styles['message-page-container']}>
        <div className={styles['message-page-header']}>MESSAGE SENDER</div>
        <div className={`${styles['message-page-table-container']}`}>
          <>
            <table className={styles['message-table-header']}>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Relation</th>
                  <th>Family Member</th>
                  <th>Mobile</th>
                  <th>Donor Mobile</th>
                  <th>DOB</th>
                  <th>Anniversary</th>
                  <th>Occasion</th>
                  <th></th>
                </tr>
              </thead>
            </table>
            <div className={styles['message-table-content-table']}>
              <table className={styles['message-table-content']}>
                <tbody className={styles['message-table-content-body']}>

                  <tr className={styles.row}>

                    <td>entry[e]</td>
                    <td>entry[e]</td>
                    <td>entry[e]</td>
                    <td>entry[e]</td>
                    <td>entry[e]</td>
                    <td>entry[e]</td>
                    <td>entry[e]</td>
                    <td>entry[e]</td>

                    <td>
                      <Button className={styles['kyc-button']} containerClassName={styles['kyc-button-container']}>Send</Button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </>
          {/* <Table tableHeads={[
            "Donor",
            "Relation",
            "Family Member",
            "Mobile",
            "Donor Mobile",
            "DOB",
            "Anniversary",
            "Occasion",
            ""
          ]} tableData={["1", "1", "1", "1"]} button={"View kyc"} /> */}
        </div>
      </div>
    </div >
  )
}

export default Message