import axios from 'axios'
import styles from '../../styles/addkyc.module.css'

export const getStaticPaths = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/getKycIds")
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

const KYC = (props) => {
  return (
    <>
      hello world
    </>
  )
}

export default KYC