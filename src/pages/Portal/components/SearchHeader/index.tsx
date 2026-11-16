import { Input } from 'antd'
import styles from './index.module.scss'
const { Search } = Input
interface Props {
  bg: string
  pageTitle?: string
  subTitle?: string
  total?: number
  loading?: boolean
  onSearch?: (value: string) => void
  showSearch?: boolean
  children?: React.ReactNode
}
const SearchHeader: React.FC<Props> = ({
  bg,
  pageTitle,
  subTitle,
  total,
  loading,
  showSearch = false,
  onSearch,
  children
}) => {
  return (
    <div
      className={styles.search_header}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className={styles.page_title}>{pageTitle}</h1>
      {subTitle && (
        <div className={styles.total}>
          平台共有
          <span className={styles.total_num}>{total}</span>个{subTitle}
        </div>
      )}
      {showSearch && (
        <div className={styles.search}>
          <Search
            placeholder='请输入搜索内容'
            enterButton='搜索'
            size='large'
            loading={loading}
            style={{ width: 1080 }}
            allowClear={true}
            onSearch={onSearch}
          />
        </div>
      )}
      {children}
    </div>
  )
}

export default SearchHeader
