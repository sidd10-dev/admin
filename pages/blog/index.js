import Navbar from '../../components/navbar'
import styles from '../../styles/blog.module.css'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const Blog = (props) => {
  const [blogContent, setBlogContent] = useState("")
  const [file, setFile] = useState()
  const [cookie, setCookie] = useCookies()
  const router = useRouter()

  const titleRef = useRef()

  const startBlog = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", titleRef.current.value)
    try {
      // console.log("before posting")
      const res = await axios.post('http://localhost:3001/api/createblog', formData, {
        headers: {
          authorization: cookie.user
        }
      })
      // console.log(res)
      router.push(`/blog/${res.data.slug}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles['blog-container']}>
      <Navbar />
      <div className={styles['blog-form-container']}>
        <div className={styles['blog-header']}>
          WRITE NEW BLOG
        </div>
        <form className={styles['blog-form']}>
          <div className={styles['blog-inputs-container']}>
            <div className={styles['blog-input-container']}>
              <label htmlFor="imgFile" className={styles['blog-label']}>Image:</label>
              <input type="file" className={styles['blog-input']} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className={styles['blog-input-container']}>
              <label htmlFor="title" className={styles['blog-label']}>Title:</label>
              <input type="text" className={styles['blog-input']} ref={titleRef} />
            </div>

            <div className={styles['blog-button-container']
            }>
              <span className={`${styles['span']} ${styles['span-1']}`}></span>
              <span className={`${styles['span']} ${styles['span-2']}`}></span>
              <span className={`${styles['span']} ${styles['span-3']}`}></span>
              <span className={`${styles['span']} ${styles['span-4']}`}></span>
              <button type="submit" className={styles['blog-button']} onClick={startBlog}>Start Writing</button>
            </div >
          </div>
        </form>
      </div>
    </div>
  )
}

export default Blog