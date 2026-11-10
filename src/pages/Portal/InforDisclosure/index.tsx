import styles from './index.module.scss'
import SearchHeader from '../components/SearchHeader'
import { useState } from 'react'
import bannerBg from '@/assets/images/portal/guide-bg.png'

const InforDisclosure = () => {
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
        pageTitle="信息披露"
        bg={bannerBg}
        subTitle="信息披露"
        total={100}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  )
}

export default InforDisclosure
