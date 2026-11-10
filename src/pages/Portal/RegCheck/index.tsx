import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import { useState } from 'react'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const RegCheck = () => {
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
        pageTitle="登记结果核验"
        bg={bannerBg}
        showSearch={false}
      />
    </div>
  )
}

export default RegCheck
