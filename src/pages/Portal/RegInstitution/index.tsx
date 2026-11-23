import { useEffect, useState } from 'react'
import SearchBar from '@/pages/Portal/components/SearchBar'
import RegInstitutionApi, {
  type InstitutionItem
} from '@/api/portal/regInstitution'
import bannerBg from '@/assets/images/portal/rg_bg_01.png'
import InstitutionList from './modules/InstitutionList'
import styles from './index.module.scss'

/** 登记机构列表每页条数（与门户原型保持一致） */
const PAGE_SIZE = 5

const RegInstitution = () => {
  const [keyword, setKeyword] = useState('')
  const [queryKeyword, setQueryKeyword] = useState('')
  const [pageNum, setPageNum] = useState(1)

  const [list, setList] = useState<InstitutionItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // 登记机构列表
  useEffect(() => {
    let ignore = false
    const fetchList = async () => {
      setLoading(true)
      try {
        const res = await RegInstitutionApi.getOrganizationList({
          pageNum,
          pageSize: PAGE_SIZE,
          sortField: 'createdTime',
          sortDirection: 'ASC',
          organizationName: queryKeyword
        })
        if (!ignore && res?.code === 20000) {
          setList(res.data?.content ?? [])
          setTotal(Number(res.data?.totalElements ?? 0))
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchList()
    return () => {
      ignore = true
    }
  }, [pageNum, queryKeyword])

  const handleSearch = () => {
    setQueryKeyword(keyword.trim())
    setPageNum(1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.headerBg} src={bannerBg} alt='' />
        <div className={styles.searchBox}>
          <SearchBar
            value={keyword}
            placeholder='请输入登记机构名称'
            buttonText='搜索机构'
            width='100%'
            loading={loading}
            onChange={setKeyword}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <InstitutionList
        list={list}
        loading={loading}
        pageNum={pageNum}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={setPageNum}
      />
    </div>
  )
}

export default RegInstitution
