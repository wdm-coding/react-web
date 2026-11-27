import styles from './index.module.scss'
const StatusView = ({
  statusName,
  color
}: {
  statusName: string
  color: string
}) => {
  return (
    <span className={styles.statusCell} style={{ color }}>
      <i className={styles.dot} style={{ backgroundColor: color }} />
      {statusName || '-'}
    </span>
  )
}
export default StatusView
