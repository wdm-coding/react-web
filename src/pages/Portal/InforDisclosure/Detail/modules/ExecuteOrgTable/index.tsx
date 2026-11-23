import { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import type { TableProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import InforDisclosureApi from '@/api/portal/inforDisclosure'
import { buildExecuteRows, type ExecuteOrgRow } from '../../utils'
import styles from '../table.module.scss'

const PAGE_SIZE = 10

const columns: TableProps<ExecuteOrgRow>['columns'] = [
  {
    title: '已授权的公共数据资源名称',
    dataIndex: 'resourceName',
    key: 'resourceName',
    width: 250,
    ellipsis: true,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '登记完成情况',
    dataIndex: 'registerStatus',
    key: 'registerStatus',
    width: 120,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '授权运营方式',
    dataIndex: 'grantType',
    key: 'grantType',
    width: 140,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '已授权的公共数据资源运营服务收费标准',
    dataIndex: 'pricing',
    key: 'pricing',
    width: 320,
    ellipsis: true,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '已授权的运营机构名称',
    dataIndex: 'institutionName',
    key: 'institutionName',
    width: 250,
    ellipsis: true
  },
  {
    title: '运营机构授权运营期限',
    dataIndex: 'term',
    key: 'term',
    width: 250,
    ellipsis: true
  },
  {
    title: '信息披露时间',
    dataIndex: 'year',
    key: 'year',
    width: 160
  }
]

/** 实施机构信息披露详情表格 */
const ExecuteOrgTable = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState<ExecuteOrgRow[]>([])

  useEffect(() => {
    if (!id) return
    let ignore = false
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const res = await InforDisclosureApi.getDisclosureDetail({
          id,
          pageNum,
          pageSize: PAGE_SIZE,
          type: 1
        })
        if (!ignore && res?.code === 20000) {
          setRows(buildExecuteRows(res.data?.content ?? []))
          setTotal(Number(res.data?.totalElements ?? 0))
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchDetail()
    return () => {
      ignore = true
    }
  }, [id, pageNum])

  return (
    <>
      <Table<ExecuteOrgRow>
        bordered
        rowKey='key'
        columns={columns}
        dataSource={rows}
        loading={loading}
        scroll={{ x: 1440 }}
        pagination={{
          position: ['bottomLeft'],
          pageSize: PAGE_SIZE,
          total,
          current: pageNum,
          onChange: setPageNum
        }}
      />
      <div className={styles.footer}>
        <Button type='primary' onClick={() => navigate(-1)}>
          返回
        </Button>
      </div>
    </>
  )
}

export default ExecuteOrgTable
