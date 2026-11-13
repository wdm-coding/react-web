import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const RegGuide = () => {
  return (
    <div className={styles.wrapper}>
      <SearchHeader bg={bannerBg}>
        <span className={styles.pageTitle}>登记指南</span>
      </SearchHeader>
    </div>
  )
}

export default RegGuide
