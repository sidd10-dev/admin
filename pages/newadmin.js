import { useCookies } from 'react-cookie'
import { useState } from 'react';
import Navbar from '../components/navbar'
import styles from '../styles/newAdmin.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faKey, faUserAstronaut, faXmark, faXmarkCircle, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Button from '../components/button';
import validator from 'validator';
import axios from 'axios';
import { useRouter } from 'next/router'

const NewAdmin = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies()
  const [error, setError] = useState(false)
  const usernameInputRef = useRef()
  const phoneInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()
  const router = useRouter()

  const resetForm = () => {
    usernameInputRef.current.value = ""
    phoneInputRef.current.value = ""
    passwordInputRef.current.value = ""
    confirmPasswordInputRef.current.value = ""
  }

  const adminCreateValidator = (admin) => {
    if (!validator.isMobilePhone(admin.phone) || admin.phone.length != 10) {
      setError("Invalid Mobile Number Entered")
      return false
    }

    if (!validator.isAlpha(admin.username)) {
      setError("Username must contain only alphabets")
      return false
    }

    if (!validator.isStrongPassword(admin.password)) {
      setError("Password doesn't satisfy the requirements")
      passwordInputRef.current.value = ""
      confirmPasswordInputRef.current.value = ""
      return false
    }

    if (admin.password != admin.confirmPassword) {
      setError("Password's don't match")
      passwordInputRef.current.value = ""
      confirmPasswordInputRef.current.value = ""
      return false
    }

    return true
  }

  const adminCreateSubmitHandler = async (event) => {
    event.preventDefault()
    console.log('form submitted')
    const admin = {
      username: usernameInputRef.current.value,
      phone: phoneInputRef.current.value,
      password: passwordInputRef.current.value,
      confirmPassword: confirmPasswordInputRef.current.value
    }
    if (adminCreateValidator(admin)) {
      setError(false)
      try {
        delete admin.confirmPassword
        const res = await axios.post('http://localhost:3001/api/admin', admin, {
          headers: {
            authorization: cookie.user
          }
        })
        resetForm()
        alert(`New Admin Created`)
        console.log(res)
      } catch (e) {
        setError(e.response.data.message)
      }
    }
  }

  return (
    <>
      <Navbar />
      <form onSubmit={adminCreateSubmitHandler} className={styles['admin-create-form']}>
        <div className={styles['admin-create-header']}>CREATE NEW ADMIN</div>
        <div className={styles['admin-create-input-container']}>
          <label className={styles['admin-create-label']} htmlFor="mobile">
            Username
          </label>
          <div className={styles['admin-input-container']}>
            <FontAwesomeIcon icon={faUserAstronaut} className={styles['fas']} />
            <span className={styles['admin-between-line']}></span>
            <input type="text" name="mobile" placeholder="Username" ref={usernameInputRef}></input>
          </div>

          <label className={styles['admin-create-label']} htmlFor="mobile">
            Phone Number
          </label>
          <div className={styles['admin-input-container']}>
            <FontAwesomeIcon icon={faPhone} className={styles['fas']} />
            <span className={styles['admin-between-line']}></span>
            <input type="text" name="mobile" placeholder="Phone Number" ref={phoneInputRef}></input>
          </div>

          <label className={styles['admin-create-label']} htmlFor="mobile">
            Password
          </label>
          <div className={styles['admin-input-container']}>
            <FontAwesomeIcon icon={faKey} className={styles['fas']} />
            <span className={styles['admin-between-line']}></span>
            <input type="password" name="password" placeholder="Password" ref={passwordInputRef}></input>
          </div>

          <label className={styles['admin-create-label']} htmlFor="mobile">
            Confirm Password
          </label>
          <div className={styles['admin-input-container']}>
            <FontAwesomeIcon icon={faClipboardCheck} className={styles['fas']} />
            <span className={styles['admin-between-line']}></span>
            <input type="password" name="password" placeholder="Confirm Password" ref={confirmPasswordInputRef}></input>
          </div>
        </div>
        {error && (
          <div className={styles['admin-create-error-msg']}>
            {error}
          </div>
        )}
        <div className={styles['admin-create-button-container']
        }>
          <span className={`${styles['span']} ${styles['span-1']}`}></span>
          <span className={`${styles['span']} ${styles['span-2']}`}></span>
          <span className={`${styles['span']} ${styles['span-3']}`}></span>
          <span className={`${styles['span']} ${styles['span-4']}`}></span>
          <button type="submit" className={styles['admin-create-button']}>Create Admin</button>
        </div >
      </form>
    </>
  )
}

export default NewAdmin