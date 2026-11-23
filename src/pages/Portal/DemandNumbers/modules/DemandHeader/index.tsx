import SearchBar from '@/pages/Portal/components/SearchBar'
import styles from './index.module.scss'

interface DemandHeaderProps {
  total: number
  keyword: string
  loading: boolean
  onChangeKeyword: (value: string) => void
  onSearch: () => void
  onPublish: () => void
}

const DemandHeader = ({
  total,
  keyword,
  loading,
  onChangeKeyword,
  onSearch,
  onPublish
}: DemandHeaderProps) => {
  const totalDigits = String(total).split('')

  return (
    <div className={styles.head}>
      <div className={styles.title}>
        <div className={styles.leftBox}>用数需求</div>
        <div className={styles.rightBox}>
          平台共有
          {totalDigits.map((digit, index) => (
            <span className={styles.number} key={index}>
              {digit}
            </span>
          ))}
          条数据
        </div>
      </div>
      <div className={styles.searchBox}>
        <SearchBar
          value={keyword}
          placeholder='请输入需求名称'
          buttonText='搜索需求'
          width='100%'
          loading={loading}
          onChange={onChangeKeyword}
          onSearch={onSearch}
        />
      </div>
      <div className={styles.postDemand} onClick={onPublish}>
        需求发布
      </div>
    </div>
  )
}

export default DemandHeader
