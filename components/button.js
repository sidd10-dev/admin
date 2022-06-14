import styles from '../styles/button.module.css'

const Button = (props) => {
  return (
    <div className={props.containerClassName + ' ' + styles['button-container']
    }>
      <span className={`${styles['span']} ${styles['span-1']}`}></span>
      <span className={`${styles['span']} ${styles['span-2']}`}></span>
      <span className={`${styles['span']} ${styles['span-3']}`}></span>
      <span className={`${styles['span']} ${styles['span-4']}`}></span>
      <button type={props.type || "button"} className={props.className || styles['button']}>{props.children}</button>
    </div >
  )
}

export default Button