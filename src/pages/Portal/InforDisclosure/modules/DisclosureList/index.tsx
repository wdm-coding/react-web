import { useCallback, useEffect, useState } from 'react'
import { List } from 'antd'
import InforDisclosureApi, {
  type DisclosureItem as DisclosureItemType
} from '@/api/portal/inforDisclosure'
import { DISCLOSURE_TYPE, type DisclosureTabKey } from '../../types'
import DisclosureItem from '../DisclosureItem'
import styles from './index.module.scss'

const PAGE_SIZE = 10

interface Props {
  activeKey: DisclosureTabKey
  /** 已确认的搜索关键词 */
  keyword: string
  onLoadingChange?: (loading: boolean) => void
}

/** 信息披露机构列表：机构卡片 + 分页 */
const DisclosureList = ({ activeKey, keyword, onLoadingChange }: Props) => {
  const [list, setList] = useState<DisclosureItemType[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchList = useCallback(
    async (page: number) => {
      setLoading(true)
      onLoadingChange?.(true)
      try {
        const res = await InforDisclosureApi.getDisclosureList({
          pageNum: page,
          pageSize: PAGE_SIZE,
          type: DISCLOSURE_TYPE[activeKey],
          ...(keyword ? { disclosureName: keyword } : {})
        })
        if (res?.code === 20000) {
          setList(res.data?.content ?? [])
          setTotal(Number(res.data?.totalElements ?? 0))
          setPageNum(page)
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        setLoading(false)
        onLoadingChange?.(false)
      }
    },
    [activeKey, keyword, onLoadingChange]
  )

  // 切换 Tab 或搜索时回到第一页
  useEffect(() => {
    fetchList(1)
  }, [fetchList])

  return (
    <List<DisclosureItemType>
      className={styles.list}
      dataSource={list}
      loading={loading}
      rowKey='id'
      pagination={{
        align: 'end',
        pageSize: PAGE_SIZE,
        total,
        current: pageNum,
        showSizeChanger: false,
        onChange: fetchList
      }}
      renderItem={(item) => (
        <List.Item>
          <DisclosureItem item={item} activeKey={activeKey} />
        </List.Item>
      )}
    />
  )
}

export default DisclosureList
