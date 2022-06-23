import styles from '../styles/table.module.css'
import Button from './button'
import Link from 'next/link'

const Table = (props) => {
  return (
    <>
      {!props.tableData && (
        <div> No Data Yet! </div>
      )}
      {props.tableData && (
        <>
          <table className={styles['donor-table-header']}>
            <thead>
              <tr>
                {props.tableHeads && props.tableHeads.map(tableHead => (
                  <th>{tableHead}</th>
                ))}
              </tr>
            </thead>
          </table>
          <div className={styles['tb2']}>
            <table className={styles['donor-table-content']}>
              <tbody className={styles['donor-table-content-body']}>
                {props.tableData && props.tableData.map(entry => (
                  <tr className={styles.row}>
                    {Object.keys(entry).map(e => (
                      <td>{entry[e]}</td>
                    ))}
                    {props.button && (
                      <td>
                        <Link href="kyc/">
                          <Button className={styles['kyc-button']} containerClassName={styles['kyc-button-container']}>{props.button}</Button>
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </>
  )
}

export default Table