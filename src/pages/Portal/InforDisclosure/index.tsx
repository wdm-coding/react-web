import { useState } from 'react'
import { Tabs } from 'antd'
import SearchBar from '@/pages/Portal/components/SearchBar'
import bannerBg from '@/assets/images/portal/rg_bg_01.png'
import DisclosureList from './modules/DisclosureList'
import { DISCLOSURE_TABS, type DisclosureTabKey } from './types'
import styles from './index.module.scss'

const InforDisclosure = () => {
  const [activeKey, setActiveKey] = useState<DisclosureTabKey>('imp')
  const [keyword, setKeyword] = useState('')
  const [queryKeyword, setQueryKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  const orgType = activeKey === 'imp' ? '实施' : '运营'

  const handleSearch = () => {
    setQueryKeyword(keyword.trim())
  }

  const handleTabChange = (key: string) => {
    setActiveKey(key as DisclosureTabKey)
    setKeyword('')
    setQueryKeyword('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.headerBg} src={bannerBg} alt='' />
        <div className={styles.topWrap}>
          <div className={styles.title}>2025年授权运营信息披露</div>
          <div className={styles.searchBox}>
            <SearchBar
              value={keyword}
              placeholder={`请输入${orgType}机构名称`}
              buttonText='搜索机构'
              width='100%'
              loading={loading}
              onChange={setKeyword}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className={styles.mainpage}>
        <Tabs
          activeKey={activeKey}
          items={DISCLOSURE_TABS}
          size='large'
          tabBarStyle={{ fontWeight: 500 }}
          onChange={handleTabChange}
        />
        <DisclosureList
          activeKey={activeKey}
          keyword={queryKeyword}
          onLoadingChange={setLoading}
        />
      </div>
    </div>
  )
}

export default InforDisclosure
