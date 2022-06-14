import Head from 'next/head'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/index.module.css'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faKey } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator'
import Button from '../components/button';
const axios = require('axios')
// require('dotenv').config()

export default function Home() {
  axios.defaults.withCredentials = true
  const router = useRouter()

  const [error, setError] = useState('')
  const [cookie, setCookie, removeCookie] = useCookies(['auth-cookie'])
  const phoneInputRef = useRef()
  const passwordInputRef = useRef()

  const adminLoginSubmitHandler = async (event) => {
    event.preventDefault()
    const phone = phoneInputRef.current.value
    const password = phoneInputRef.current.value

    if (!validator.isMobilePhone(phone) || phone.length != 10)
      setError("Invalid Mobile Number!")
    else
      setError("")
    axios.post('http://localhost:3001/api/login', {
      phone,
      password
    }).then(res => {
      setCookie('user', res.data.token, { path: '/' })
      setCookie('username', res.data.username, { path: '/' })
      router.push('/home')
    }
    ).catch(e => console.log(e))
  }

  useEffect(() => {
    if (cookie.user)
      router.push('/home')
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Swagatham Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={adminLoginSubmitHandler} className={styles['admin-login-form']}>
        <div className={styles['admin-login-header']}>ADMIN LOGIN</div>
        <div className={styles['admin-login-input-container']}>
          <label className={styles['admin-login-label']} htmlFor="mobile">
            Phone Number
          </label>
          <div className={styles['admin-input-container']}>
            <FontAwesomeIcon icon={faPhone} className={styles['fas']} />
            <span className={styles['admin-between-line']}></span>
            <input type="text" name="mobile" placeholder="Phone Number" ref={phoneInputRef}></input>
          </div>

          <label className={styles['admin-login-label']} htmlFor="mobile">
            Password
          </label>
          <div className={styles['admin-input-container']}>
            <FontAwesomeIcon icon={faKey} className={styles['fas']} />
            <span className={styles['admin-between-line']}></span>
            <input type="password" name="password" placeholder="Password" ref={passwordInputRef}></input>
          </div>
        </div>
        {error && (
          <div className={styles['admin-error-msg']}>
            {error}
          </div>
        )}
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
