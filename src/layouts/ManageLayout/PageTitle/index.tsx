import { ReactNode } from 'react'
import styles from './index.module.scss'
import Icon from '@/components/Icon';

interface Props {
  title: string | ReactNode,
  extra?: string | ReactNode,
  showBack?: boolean,
}
const PageTitle: React.FC<Props> = ({ title, extra, showBack = true }) => {  
  return (
    <div className={styles.pageTitle}>
      <div className='flex items-center gap-2'>
        {showBack && (
          <span onClick={() => {
            window.history.back()
          }}>
            <Icon name="RollbackOutlined" size={20} color="#1471ff" />
          </span>
        )}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {extra}
    </div>
  )
}
export default PageTitle