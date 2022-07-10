import styles from '../../styles/donors.module.css'
import Navbar from '../../components/navbar'
import Table from '../../components/table'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowDown, faArrowDown91, faArrowsDownToLine, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Donors = (props) => {
  const [cookie, setCookie] = useCookies()
  const [donors, setDonors] = useState([])
  const [displayMenus, setDisplayMenus] = useState(false)
  const [filterSelect, setFilterSelect] = useState("none")

  useEffect(async () => {
    if (filterSelect == "dob") {
      try {
        const res = await axios.get("http://localhost:3001/api/getDonorsByDob", {
          headers: {
            authorization: cookie.user
          }
        })
        setDonors(res.data)
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const res = await axios.get("http://localhost:3001/api/donors", {
          headers: {
            authorization: cookie.user
          }
        })
        setDonors(res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }, [filterSelect])

  const sendMessageHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/sendMessage", {
        headers: {
          authorization: cookie.user
        }
      })
      if (res.data == true) {
        alert("Messages sent!")
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles['donors-page-container']}>
        <div className={styles['donors-page-header']}>DONORS</div>
        {/* <div className={styles['donors-page-filter']}>
          <div className={styles['donors-page-filter-header']}>Filter By:</div>
          <div className={styles['donors-page-dropdown']} onClick={() => { setDisplayMenus(prev => !prev) }}>
            Select
            <FontAwesomeIcon icon={faAngleDown} className={styles['donors-page-icon']}></FontAwesomeIcon>
            {displayMenus && (
              <div className={styles['donor-page-options']}>
                <div className={styles['donor-page-option']} onClick={() => { setFilterSelect("none") }}>None</div>
                <div className={styles['donor-page-option']} onClick={() => { setFilterSelect("dob") }}>DOB</div>
              </div>
            )}
          </div>
        </div> */}
        {/* {filterSelect == "dob" && (
          <div className={styles['donors-button-container']
          }>
            <span className={`${styles['span']} ${styles['span-1']}`}></span>
            <span className={`${styles['span']} ${styles['span-2']}`}></span>
            <span className={`${styles['span']} ${styles['span-3']}`}></span>
            <span className={`${styles['span']} ${styles['span-4']}`}></span>
            <button type="submit" className={styles['donors-button']} onClick={sendMessageHandler}>Send Wish Message</button>
          </div >
        )} */}
        <div className={`${styles['donors-page-table-container']}`}>
          <Table tableHeads={[
            "ID",
            "Name",
            "Mobile Number",
            "Date of birth",
            ""
          ]} tableData={donors} button={"View kyc"} />
        </div>
      </div>
    </>
  )
}

export default Donors