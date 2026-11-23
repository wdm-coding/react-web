import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/pages/Portal/components/SearchBar'
import RegPublicApi, { type RegPublicItem } from '@/api/portal/regPublic'
import { GANSU_AREA_CODE } from '@/api/portal/common'
import useAuth from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import bannerBg from '@/assets/images/portal/rg_bg_01.png'
import FilterConditions, {
  DEFAULT_FILTERS,
  type RegPublicFilters
} from './modules/FilterConditions'
import PublicityTable from './modules/PublicityTable'
import ObjectionModal from './modules/ObjectionModal'
import styles from './index.module.scss'

const RegPublic = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { authModal } = useModal('global')

  const [keyword, setKeyword] = useState('')
  const [queryKeyword, setQueryKeyword] = useState('')
  const [filters, setFilters] = useState<RegPublicFilters>(DEFAULT_FILTERS)

  const [list, setList] = useState<RegPublicItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [objectionOpen, setObjectionOpen] = useState(false)
  const [objectionRecord, setObjectionRecord] = useState<RegPublicItem | null>(
    null
  )

  // 公示列表
  useEffect(() => {
    let ignore = false
    const fetchList = async () => {
      setLoading(true)
      try {
        const res = await RegPublicApi.getPublicityList({
          pageNum,
          pageSize,
          dataRegistName: queryKeyword,
          dataRegistType: filters.dataRegistType,
          coverageArea: filters.coverageArea
            ? JSON.stringify([GANSU_AREA_CODE, filters.coverageArea])
            : null,
          industry: filters.industry,
          sortDirection: 'ASC',
          sortField: 'CREATE_TIME'
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

  const handleDetail = (item: RegPublicItem) => {
    navigate(`/portal/regPublicDetail?publiclyInfoId=${item.publicityInfoId}`)
  }

  const handleObjection = (item: RegPublicItem) => {
    if (!isLoggedIn) {
      window.$message.warning('请先登录，再提交异议')
      authModal.open()
      return
    }
    setObjectionRecord(item)
    setObjectionOpen(true)
  }

  const handleObjectionSubmit = async () => {
    window.$message.info('异议申诉提交接口待接入')
    return false
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
            <span className={styles.pageTitle}>公示信息</span>
            <span className={styles.divider} />
            <span className={styles.count}>
              平台共有
              {digitList.map((digit, index) => (
                <span className={styles.number} key={`${digit}-${index}`}>
                  {digit}
                </span>
              ))}
              个公示信息
            </span>
          </div>
          <SearchBar
            value={keyword}
            placeholder='请输入登记数据名称或登记主体名称'
            buttonText='搜索资源'
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
        <PublicityTable
          list={list}
          loading={loading}
          isLoggedIn={isLoggedIn}
          pageNum={pageNum}
          pageSize={pageSize}
          total={total}
          onPageChange={(page, size) => {
            setPageNum(page)
            setPageSize(size)
          }}
          onDetail={handleDetail}
          onObjection={handleObjection}
        />
        <ObjectionModal
          open={objectionOpen}
          record={objectionRecord}
          onCancel={() => setObjectionOpen(false)}
          onSubmit={handleObjectionSubmit}
        />
      </div>
    </div>
  )
}

export default RegPublic
