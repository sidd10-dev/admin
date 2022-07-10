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

        {cookie.username && (<div className={styles['user']}>
          User: {cookie.username}
        </div>)}

        {!cookie.username && (<div className={styles['user']}>
          Not Logged In
        </div>)}
      </div>

      <div className={`${styles['admin-navbar']} ${toggle ? styles['change'] : ""}`}>
        <div src="../public/logo.png" className={`${styles['logo']}`}></div>
        <span className={styles['navbar-line']}></span>
        <div className={styles['admin-navbar-elements']}>
          <Link href="/home">
            <div className={styles['admin-navbar-element']}>Home</div>
          </Link>
          <Link href="/donors/">
            <div className={styles['admin-navbar-element']}>Donors</div>
          </Link>
          <Link href="/newadmin">
            <div className={styles['admin-navbar-element']}>New Admin</div>
          </Link>
          <Link href="/donations">
            <div className={styles['admin-navbar-element']}>Donations</div>
          </Link>
          <Link href="/logs">
            <div className={styles['admin-navbar-element']}>Logs</div>
          </Link>
          <Link href="/blog">
            <div className={styles['admin-navbar-element']}>New Blog</div>
          </Link>
          <Link href="/blog/drafts">
            <div className={styles['admin-navbar-element']}>View Drafts</div>
          </Link>
          <Link href="/blog/published">
            <div className={styles['admin-navbar-element']}>Published Blogs</div>
          </Link>
          <Link href="/kyc">
            <div className={styles['admin-navbar-element']}>Add/Edit KYC</div>
          </Link>
          <Link href="/message">
            <div className={styles['admin-navbar-element']}>Send Message</div>
          </Link>
          <Link href="/logout">
            <div className={styles['admin-navbar-element']}>Logout</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar