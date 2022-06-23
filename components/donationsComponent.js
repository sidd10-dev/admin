import styles from '../styles/donationsComponent.module.css'
import Table from './table'

const Donations = (props) => {
  return (
    <>
      <div class={styles['donation-container']}>
        <Table tableHeads={[
          "ID",
          "Donated By",
          "Amount",
          // "Date donated"
        ]} tableData={props.donationData}></Table>
      </div>
    </>
  )
}

export default Donations