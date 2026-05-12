import styles from "./Error.module.css"

export const TaskError: React.FC<{title: string, message: string}> = (props) => {

  const {title, message} = props

  return (
    <div className={styles.error}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
