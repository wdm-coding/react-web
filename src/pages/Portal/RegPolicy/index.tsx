import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/pages/Portal/components/SearchBar'
import CategoryTabs, {
  type CategoryTabItem
} from '@/pages/Portal/components/CategoryTabs'
import RegPolicyApi, {
  type PolicyClassificationItem,
  type PolicyItem
} from '@/api/portal/regPolicy'
import bannerBg from '@/assets/images/portal/rg_bg_01.png'
import PolicyList from './modules/PolicyList'
import styles from './index.module.scss'

const PAGE_SIZE = 10

const RegPolicy = () => {
  const navigate = useNavigate()

  // 搜索条件
  const [keyword, setKeyword] = useState('')
  const [queryKeyword, setQueryKeyword] = useState('')
  const [classifications, setClassifications] = useState<
    PolicyClassificationItem[]
  >([])
  const [classificationId, setClassificationId] = useState('')

  // 列表数据
  const [list, setList] = useState<PolicyItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)

  // 政策分类
  useEffect(() => {
    let ignore = false
    const fetchClassifications = async () => {
      try {
        const res = await RegPolicyApi.getClassificationList({
          pageNum: 1,
          pageSize: 10,
          sortField: 'sorting',
          sortDirection: 'ASC'
        })
        if (ignore || res?.code !== 20000) return
        const content = res.data?.content ?? []
        setClassifications(content)
        if (content[0]) setClassificationId(content[0].classificationId)
      } catch {
        // 错误提示由响应拦截器统一处理
      }
    }
    fetchClassifications()
    return () => {
      ignore = true
    }
  }, [])

  // 政策列表
  useEffect(() => {
    if (!classificationId) return
    let ignore = false
    const fetchList = async () => {
      setLoading(true)
      try {
        const res = await RegPolicyApi.getPolicyList({
          pageNum,
          pageSize: PAGE_SIZE,
          classificationId,
          title: queryKeyword,
          sortField: 'sorting',
          sortDirection: 'ASC',
          policyStatus: 0
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
  }, [classificationId, pageNum, queryKeyword])

  const tabItems = useMemo<CategoryTabItem[]>(
    () =>
      classifications.map((item) => ({
        key: item.classificationId,
        label: item.classificationName
      })),
    [classifications]
  )

  const handleSearch = () => {
    setQueryKeyword(keyword.trim())
    setPageNum(1)
  }

  const handleTabChange = (key: string) => {
    setClassificationId(key)
    setPageNum(1)
  }

  const handleDetail = (item: PolicyItem) => {
    navigate(`/portal/regPolicyDetail?policyId=${item.policyId}`, {
      state: { policy: item }
    })
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${bannerBg})` }}
      />
      <div className={styles.box}>
        <div className={styles.head}>
          <SearchBar
            value={keyword}
            width='100%'
            placeholder='请输入关键字'
            buttonText='搜索政策'
            loading={loading}
            onChange={setKeyword}
            onSearch={handleSearch}
          />
        </div>
        <div className={styles.content}>
          <CategoryTabs
            items={tabItems}
            value={classificationId}
            onChange={handleTabChange}
          />
          <PolicyList
            list={list}
            loading={loading}
            pageNum={pageNum}
            pageSize={PAGE_SIZE}
            total={total}
            onPageChange={setPageNum}
            onDetail={handleDetail}
          />
        </div>
      </div>
    </div>
  )
}

export default RegPolicy
