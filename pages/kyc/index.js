import styles from '../../styles/newkyc.module.css'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { faPhone, faKey } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/button';
import Navbar from '../../components/navbar';
import axios from 'axios';
// import { useRouter } from 'next/router';

const NewKyc = (props) => {

  const router = useRouter()

  const [error, setError] = useState('')
  const [cookie, setCookie, removeCookie] = useCookies(['auth-cookie'])
  const phoneInputRef = useRef()

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    const mobile = phoneInputRef.current.value
    try {
      const donor = await axios.post("http://localhost:3001/api/kycNumber", { mobile }, {
        headers: {
          authorization: cookie.user
        }
      })

      if (donor.mobile) {
        router.push(`/kyc/${donor.id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Swagatham kyc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <form className={styles['kyc-login-form']} onSubmit={formSubmitHandler}>
        <div className={styles['kyc-login-header']}>KYC</div>
        <div className={styles['kyc-login-input-container']}>
          <label className={styles['kyc-login-label']} htmlFor="mobile">
            Phone Number
          </label>
          <div className={styles['kyc-input-container']}>
            <FontAwesomeIcon icon={faPhone} className={styles['fas']} />
            <span className={styles['kyc-between-line']}></span>
            <input type="text" name="mobile" placeholder="Enter Phone number of customer" ref={phoneInputRef}></input>
          </div>
        </div>
        {error && (
          <div className={styles['kyc-error-msg']}>
            {error}
          </div>
        )}
        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}

export default NewKyc