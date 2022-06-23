import axios from 'axios'
import Navbar from '../../components/navbar'
import styles from '../../styles/kycdetails.module.css'

export const getStaticPaths = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/getUserIds")
    const paths = res.data.map(id => {
      return {
        params: {
          id: id.id.toString()
        }
      }
    })
    return {
      paths,
      fallback: false
    }
  } catch (e) {
    console.log(e)
  }
}

export const getStaticProps = async (ctx) => {
  const id = ctx.params.id
  try {
    const donor = await axios.get("http://localhost:3001/api/getKyc", {
      params: {
        id
      }
    })
    console.log(donor)
    return {
      props: {
        donor: donor.data
      }
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

const Id = (props) => {
  return (
    <div>
      <Navbar />
      <div className={styles['kyc-details-container']}>
        <div className={styles['kyc-details-header']}>
          KYC - {props.donor.name}
        </div>
        <div className={styles['kyc-details']}>
          <div className={styles['kyc-details-left']}>
            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Name:</div>
              <div className={styles['kyc-details-value']}>{props.donor.name}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Gender:</div>
              <div className={styles['kyc-details-value']}>{props.donor.gender}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>DOB:</div>
              <div className={styles['kyc-details-value']}>{props.donor.dob}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>PAN:</div>
              <div className={styles['kyc-details-value']}>{props.donor.pan}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Address:</div>
              <div className={styles['kyc-details-value']}>{props.donor.address}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Pincode:</div>
              <div className={styles['kyc-details-value']}>{props.donor.pincode}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Country:</div>
              <div className={styles['kyc-details-value']}>{props.donor.country}</div>
            </div>

          </div>
          <div className={styles['kyc-details-right']}><div className={styles['kyc-details-data-container']}>
            <div className={styles['kyc-details-label']}>Father/Spouse Name:</div>
            <div className={styles['kyc-details-value']}>{props.donor.fs_name}</div>
          </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Marital Status</div>
              <div className={styles['kyc-details-value']}>{props.donor.m_status}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Residential Status:</div>
              <div className={styles['kyc-details-value']}>{props.donor.status}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Aadhar:</div>
              <div className={styles['kyc-details-value']}>{props.donor.aaddhar}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>City/Town/Village:</div>
              <div className={styles['kyc-details-value']}>{props.donor.ctv}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>State:</div>
              <div className={styles['kyc-details-value']}>{props.donor.state}</div>
            </div>

            <div className={styles['kyc-details-data-container']}>
              <div className={styles['kyc-details-label']}>Mobile:</div>
              <div className={styles['kyc-details-value']}>{props.donor.mobile}</div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Id