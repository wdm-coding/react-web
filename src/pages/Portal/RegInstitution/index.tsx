import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import { useState } from 'react'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const RegInstitution = () => {
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
        pageTitle="登记机构"
        bg={bannerBg}
        subTitle="登记机构"
        total={100}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  )
}

export default RegInstitution
