import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemandNumbersApi, {
  type DemandNumbersItem,
  type IndustryItem
} from '@/api/portal/demandNumbers'
import useAuth from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import DemandHeader from './modules/DemandHeader'
import DemandFilter from './modules/DemandFilter'
import DemandList from './modules/DemandList'
import styles from './index.module.scss'

const DemandNumbers = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { authModal } = useModal('global')

  const [keyword, setKeyword] = useState('')
  const [queryKeyword, setQueryKeyword] = useState('')
  const [dataType, setDataType] = useState<string | null>(null)
  const [industryId, setIndustryId] = useState<string | null>(null)
  const [industryList, setIndustryList] = useState<IndustryItem[]>([])

  const [list, setList] = useState<DemandNumbersItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  // 行业分类
  useEffect(() => {
    const fetchIndustryList = async () => {
      try {
        const res = await DemandNumbersApi.getIndustryList({})
        if (res?.code === 20000) setIndustryList(res.data ?? [])
      } catch {
        // 错误提示由响应拦截器统一处理
      }
    }
    fetchIndustryList()
  }, [])

  // 用数需求列表
  useEffect(() => {
    let ignore = false
    const fetchList = async () => {
      setLoading(true)
      try {
        const res = await DemandNumbersApi.getDemandNumbersList({
          pageNum: pageNum - 1,
          pageSize,
          demandName: queryKeyword,
          dataType,
          industryId,
          isHome: '1'
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
  }, [pageNum, pageSize, queryKeyword, dataType, industryId])

  const handleSearch = () => {
    setPageNum(1)
    setQueryKeyword(keyword.trim())
  }

  // 需求发布：未登录先引导登录，已登录进入需求管理
  const handlePublish = () => {
    if (!isLoggedIn) {
      authModal.open('请先登录，再发布需求')
      return
    }
    navigate('/manage/demandNumbersManager')
  }

  return (
    <div className={styles.container}>
      <div className={styles.bg} />
      <div className={styles.box}>
        <DemandHeader
          total={total}
          keyword={keyword}
          loading={loading}
          onChangeKeyword={setKeyword}
          onSearch={handleSearch}
          onPublish={handlePublish}
        />
        <DemandFilter
          dataType={dataType}
          industryId={industryId}
          industryList={industryList}
          onChangeDataType={setDataType}
          onChangeIndustry={setIndustryId}
        />
        <DemandList
          data={list}
          total={total}
          loading={loading}
          pageNum={pageNum}
          pageSize={pageSize}
          onPageChange={(page, size) => {
            setPageNum(page)
            setPageSize(size)
          }}
        />
      </div>
    </div>
  )
}

export default DemandNumbers
