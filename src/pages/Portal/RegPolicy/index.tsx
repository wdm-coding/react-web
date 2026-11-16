import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const RegPolicy = () => {
  return (
    <div className={styles.wrapper}>
      <SearchHeader bg={bannerBg}/>
    </div>
  )
}

export default RegPolicy
