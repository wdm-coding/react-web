import { useEffect, useMemo, useState } from 'react'
import SearchBar from '@/pages/Portal/components/SearchBar'
import { useNavigate } from 'react-router-dom'
import RegQueryApi, { type ResourceItem } from '@/api/portal/regQuery'
import { GANSU_AREA_CODE } from '@/api/portal/common'
import bannerBg from '@/assets/images/ResourceQuery/rq_bg_01.png'
import FilterConditions, {
  DEFAULT_FILTERS,
  type RegQueryFilters
} from './modules/FilterConditions'
import ResourceList from './modules/ResourceList'
import styles from './index.module.scss'

const RegQuery = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [queryKeyword, setQueryKeyword] = useState('')
  const [filters, setFilters] = useState<RegQueryFilters>(DEFAULT_FILTERS)

  const [list, setList] = useState<ResourceItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  // 资源列表
  useEffect(() => {
    let ignore = false
    const fetchList = async () => {
      setLoading(true)
      try {
        const res = await RegQueryApi.getResourceList({
          pageNum,
          pageSize,
          dataRegistType: filters.dataRegistType,
          industry: filters.industry,
          coverageArea: filters.coverageArea
            ? JSON.stringify([GANSU_AREA_CODE, filters.coverageArea])
            : null,
          dataOrinstitutionName: queryKeyword
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
  }, [pageNum, pageSize, filters, queryKeyword])

  const digitList = useMemo(() => String(total).split(''), [total])

  const handleSearch = () => {
    setQueryKeyword(keyword.trim())
    setPageNum(1)
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${bannerBg})` }}
      />
      <div className={styles.box}>
        <div className={styles.head}>
          <div className={styles.title}>
            <span className={styles.pageTitle}>数据资源</span>
            <span className={styles.divider} />
            <span className={styles.count}>
              平台共有
              {digitList.map((digit, index) => (
                <span className={styles.number} key={`${digit}-${index}`}>
                  {digit}
                </span>
              ))}
              条数据资源
            </span>
          </div>
          <SearchBar
            value={keyword}
            placeholder='请输入登记数据名称或登记主体名称'
            buttonText='搜索资源'
            loading={loading}
            onChange={setKeyword}
            onSearch={handleSearch}
          />
        </div>
        <FilterConditions
          value={filters}
          onChange={(next) => {
            setFilters(next)
            setPageNum(1)
          }}
        />
        <ResourceList
          list={list}
          loading={loading}
          pageNum={pageNum}
          pageSize={pageSize}
          total={total}
          onPageChange={(page, size) => {
            setPageNum(page)
            setPageSize(size)
          }}
          onItemClick={(item) =>
            navigate(`/portal/regQueryDetail?dataRegistId=${item.dataRegistId}`)
          }
        />
      </div>
    </div>
  )
}

export default RegQuery
