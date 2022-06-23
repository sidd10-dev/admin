import axios from 'axios'
import Navbar from '../components/navbar'
import Table from '../components/table'
import styles from '../styles/logs.module.css'
import { useCookies } from 'react-cookie'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Logs = (props) => {
  const [logs, setLogs] = useState()

  const [cookies, setCookie] = useCookies([])

  const startDateRef = useRef()
  const endDateRef = useRef()

  const logsPageButtonHandler = async (event) => {
    event.preventDefault()
    try {
      const logs = await axios.get('http://localhost:3001/api/logs', {
        headers: {
          authorization: cookies.user
        },
        params:
        {
          startDate: startDateRef.current.value,
          endDate: endDateRef.current.value,
        }
      })
      console.log(logs.data)
      const modifiedLogs = logs.data.map(log => {
        // console.log(JSON.parse(log.metadata))
        const date = new Date(log.timestamp)
        const timestamp = date.getDate() +
          "/" + (date.getMonth() + 1) +
          "/" + date.getFullYear() +
          " " + date.getHours() +
          ":" + date.getMinutes() +
          ":" + date.getSeconds();
        return {
          id: log.id,
          level: log['msg-level'],
          log: log.log,
          timestamp,
          requestedBy: JSON.parse(log.metadata).requestedBy
        }
      })
      await setLogs(modifiedLogs)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles['logs-page-container']}>
        <div className={styles['logs-page-header']}>
          LOGS
        </div>

        <form className={styles['logs-date-form']}>
          <div className={styles['logs-date-container']}>
            <label htmlFor='startdate' className={styles['logs-page-label']}>Start Date:</label>
            <input type="date" className={styles['logs-page-input']} ref={startDateRef}></input>
          </div>

          <div className={styles['logs-date-container']}>
            <label htmlFor='enddate' className={styles['logs-page-label']}>End Date:</label>
            <input type="date" className={styles['logs-page-input']} ref={endDateRef}></input>
          </div>

          <button className={styles['logs-page-button']} onClick={logsPageButtonHandler}><FontAwesomeIcon icon={faSearch} /></button>
        </form>

        <div className={styles['logs-page-table']}>
          <Table tableHeads={[
            "ID",
            "LEVEL",
            "LOG",
            "TIMESTAMP",
            "REQUESTED BY"
          ]} tableData={logs}></Table>
        </div>
      </div>
    </>
  )
}

export default Logs