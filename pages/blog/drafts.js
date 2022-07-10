import axios from 'axios'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import styles from '../../styles/drafts.module.css'

export const getStaticProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:3001/api/getdrafts")
    return {
      props: {
        drafts: res.data
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const drafts = (props) => {

  const toBase64 = (arr) => {
    return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
  }

  return (
    <div className={styles['drafts-container']}>
      <Navbar />
      <div className={styles['drafts']}>
        <div className={styles['drafts-header']}>
          Drafts
        </div>

        {props.drafts.length == 0 && (
          <>
            No Pending Drafts!
          </>
        )}

        {props.drafts.length > 0 && (
          <>
            {props.drafts.map(draft => (
              <div className={styles['draft']}>
                <img src={`data:image/jpeg;base64, ${toBase64(draft.image.data)}`} className={styles['draft-img']}></img>
                <div className={styles['draft-details']}>
                  <div className={styles['draft-title']}>
                    <span>Title:</span> {draft.title}
                  </div>
                  <div className={styles['draft-author']}>
                    <span>Author:</span> {draft.author.username}
                  </div>
                </div>
                <Link href={`/blog/${draft.slug}`}>
                  <div className={styles['draft-button-container']
                  }>
                    <span className={`${styles['span']} ${styles['span-1']}`}></span>
                    <span className={`${styles['span']} ${styles['span-2']}`}></span>
                    <span className={`${styles['span']} ${styles['span-3']}`}></span>
                    <span className={`${styles['span']} ${styles['span-4']}`}></span>
                    <button type="submit" className={styles['draft-button']}>EDIT</button>
                  </div >
                </Link>

              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default drafts