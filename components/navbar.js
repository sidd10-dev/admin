import styles from '../styles/navbar.module.css'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import logo from '../public/favicon.ico'
import Link from 'next/link'

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies()

  const menuClickHandler = () => {
    setToggle(prev => {
      return !prev
    })
    // console.log(cookie.user)
  }

  return (
    <>
      <div className={styles['topbar']}>
        <div className={`${styles['menu']} ${toggle ? styles['change'] : ""}`} onClick={menuClickHandler}>
          <div className={`${styles['line']} ${styles['line-1']} ${toggle ? styles['change'] : ""}`}></div>
          <div className={`${styles['line']} ${styles['line-2']} ${toggle ? styles['change'] : ""}`}></div>
          <div className={`${styles['line']} ${styles['line-3']} ${toggle ? styles['change'] : ""}`}></div>
        </div>

        <div className={styles['header']}>
          Swagatham Admin Panel
        </div>

        <div className={styles['user']}>
          User: {cookie.username}
        </div>
      </div>

      <div className={`${styles['admin-navbar']} ${toggle ? styles['change'] : ""}`}>
        <div src="../public/logo.png" className={`${styles['logo']}`}></div>
        <span className={styles['navbar-line']}></span>
        <div className={styles['admin-navbar-elements']}>
          <div className={styles['admin-navbar-element']}>Home</div>
          <div className={styles['admin-navbar-element']}>Donors</div>
          <Link href="/newadmin">
            <div className={styles['admin-navbar-element']}>New Admin</div>
          </Link>
          <div className={styles['admin-navbar-element']}>Donations</div>
          <div className={styles['admin-navbar-element']}>Logs</div>
          <Link href="/logout">
            <div className={styles['admin-navbar-element']}>Logout</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar