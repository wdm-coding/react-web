import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import { useState } from 'react'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const DemandNumbers = () => {
  const [loading, setLoading] = useState(false)
  const onSearch = (value: string) => {
    setLoading(true)
    setTimeout(() => {
      console.log(value)
      setLoading(false)
    }, 1000)
  }
  return (
    <div className={styles.wrapper}>
      <SearchHeader 
        pageTitle="用数需求"
        bg={bannerBg}
        subTitle="用数需求"
        total={100}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  )
}

export default DemandNumbers
