import styles from '../../styles/publishedblogs.module.css'
import axios from 'axios'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

export const getStaticProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:3001/api/getpublished")
    // console.log(res)
    return {
      props: {
        published: res.data
      }
    }
  } catch (error) {
    throw error
    console.log(error)
  }
}

const Published = (props) => {
  const router = useRouter()

  const toBase64 = (arr) => {
    return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
  }
  const [cookies] = useCookies()

  const blogDelete = async (slug) => {
    try {
      await axios.get("http://localhost:3001/api/deleteblog", {
        headers: {
          authorization: cookies.user
        },
        params: {
          slug
        }
      })
      router.push('/blog/published')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles['published-container']}>
      <Navbar />
      <div className={styles['published']}>
        <div className={styles['published-header']}>
          Published Blogs
        </div>

        {!props.published && (
          <>
            No Blogs Published!
          </>
        )}

        {props.published && (
          <>
            {props.published.map(publishedBlog => (
              <div className={styles['published-blog']}>
                <img src={`data:image/jpeg;base64, ${toBase64(publishedBlog.image.data)}`} className={styles['published-blog-img']}></img>
                <div className={styles['published-blog-details']}>
                  <div className={styles['published-blog-title']}>
                    <span>Title:</span> {publishedBlog.title}
                  </div>
                  <div className={styles['published-blog-author']}>
                    <span>Author:</span> {publishedBlog.author.username}
                  </div>
                </div>
                <Link href={`/blog/${publishedBlog.slug}`}>
                  <div className={styles['published-blog-button-container']
                  }>
                    <span className={`${styles['span']} ${styles['span-1']}`}></span>
                    <span className={`${styles['span']} ${styles['span-2']}`}></span>
                    <span className={`${styles['span']} ${styles['span-3']}`}></span>
                    <span className={`${styles['span']} ${styles['span-4']}`}></span>
                    <button type="submit" className={styles['published-blog-button']}>EDIT</button>
                  </div >
                </Link>
                <div className={styles['published-blog-delete-button-container']
                }>
                  <button type="submit" className={styles['published-blog-delete-button']} onClick={() => blogDelete(publishedBlog.slug)}>DELETE</button>
                </div >
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Published