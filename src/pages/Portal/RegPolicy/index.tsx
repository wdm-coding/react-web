import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import { useState } from 'react'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const RegPolicy = () => {
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
        pageTitle="登记政策"
        bg={bannerBg}
        subTitle="登记政策"
        total={100}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  )
}

export default RegPolicy
