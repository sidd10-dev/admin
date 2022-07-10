import axios from "axios"
import { useEffect, useRef } from "react"
import { useCookies } from "react-cookie"
import Navbar from "../../components/navbar"
import styles from "../../styles/updateblog.module.css"
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/getslugs")
    const paths = res.data.map(blog => {
      return ({
        params: {
          slug: blog.slug.toString()
        }
      })
    })
    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.log(error)
  }
}

export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug
  try {
    const blog = await axios.get("http://localhost:3001/api/getBlog", {
      params: {
        slug
      }
    })
    // console.log(blog.draft)
    return {
      props: {
        blog: blog.data
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const Slug = (props) => {
  const blogRef = useRef()
  const [cookie, setCookie] = useCookies()
  const router = useRouter()

  useEffect(() => {
    blogRef.current.value = props.blog.content
    console.log(props.blog.draft)
  }, [])

  const toBase64 = (arr) => {
    return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
  }

  const saveDraftHandler = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/api/updateblog", {
        slug: props.blog.slug,
        content: blogRef.current.value,
        draft: true
      }, {
        headers: {
          authorization: cookie.user
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const publishBlogHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3001/api/updateblog", {
        slug: props.blog.slug,
        content: blogRef.current.value,
        draft: false
      }, {
        headers: {
          authorization: cookie.user
        }
      })
      router.push('/blog/drafts')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles['blog-draft-container']}>
      <Navbar />
      {/* {props.blog.title} */}
      <div className={styles['blog-draft']}>
        <div className={styles['blog-draft-header']}>
          Update Blog - {props.blog.title}
        </div>

        <img src={`data:image/jpeg;base64, ${toBase64(props.blog.image.data)}`} className={styles['blog-draft-img']}></img>

        <div className={styles['blog-draft-content']}>
          <label className={styles['blog-draft-label']}>WRITE HERE:</label>
          <textarea className={styles['content-text-area']} ref={blogRef} placeholder="Start Writing"></textarea>
        </div>

        <div className={styles['blog-draft-buttons']}>
          {props.blog.draft && (<div className={styles['blog-draft-button-container']
          }>
            <span className={`${styles['span']} ${styles['span-1']}`}></span>
            <span className={`${styles['span']} ${styles['span-2']}`}></span>
            <span className={`${styles['span']} ${styles['span-3']}`}></span>
            <span className={`${styles['span']} ${styles['span-4']}`}></span>
            <button type="submit" className={styles['blog-draft-button']} onClick={saveDraftHandler}>Save Draft</button>
          </div >)}

          <div className={styles['blog-draft-button-container']}>
            <span className={`${styles['span']} ${styles['span-1']}`}></span>
            <span className={`${styles['span']} ${styles['span-2']}`}></span>
            <span className={`${styles['span']} ${styles['span-3']}`}></span>
            <span className={`${styles['span']} ${styles['span-4']}`}></span>
            <button type="submit" className={styles['blog-draft-button']} onClick={publishBlogHandler}>Save and Publish</button>
          </div >
        </div>
      </div>
    </div>
  )
}

export default Slug