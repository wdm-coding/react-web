import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

interface MoreLinkProps {
  to: string
}

const MoreLink = ({ to }: MoreLinkProps) => {
  const navigate = useNavigate()

  return (
    <button
      type='button'
      className={styles.moreBtn}
      onClick={() => navigate(to)}
    >
      查看更多
    </button>
  )
}

export default MoreLink
