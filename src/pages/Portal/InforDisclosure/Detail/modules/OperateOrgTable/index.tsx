import { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import type { TableProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import InforDisclosureApi from '@/api/portal/inforDisclosure'
import { buildOperateRows, type OperateOrgRow } from '../../utils'
import styles from '../table.module.scss'

const PAGE_SIZE = 10

const columns: TableProps<OperateOrgRow>['columns'] = [
  {
    title: '产品和服务名称',
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
    ellipsis: true,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '产品和服务方式',
    dataIndex: 'grantType',
    key: 'grantType',
    width: 140,
    ellipsis: true,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '产品和服务的应用场景',
    dataIndex: 'scene',
    key: 'scene',
    width: 250,
    ellipsis: true,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '产品和服务收费标准',
    dataIndex: 'pricing',
    key: 'pricing',
    width: 250,
    ellipsis: true,
    onCell: (row) => ({ rowSpan: row.rowSpan })
  },
  {
    title: '实施机构名称',
    dataIndex: 'institutionName',
    key: 'institutionName',
    width: 250,
    ellipsis: true
  },
  {
    title: '已授权的公共数据资源名称',
    dataIndex: 'dataRegistName',
    key: 'dataRegistName',
    width: 250,
    ellipsis: true
  },
  {
    title: '实施机构登记状态',
    dataIndex: 'orgRegisterStatus',
    key: 'orgRegisterStatus',
    width: 160,
    ellipsis: true
  },
  {
    title: '运营期限',
    dataIndex: 'term',
    key: 'term',
    width: 250,
    ellipsis: true
  },
  {
    title: '信息披露时间',
    dataIndex: 'year',
    key: 'year',
    width: 140
  }
]

/** 运营机构信息披露详情表格 */
const OperateOrgTable = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState<OperateOrgRow[]>([])

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
          type: 2
        })
        if (!ignore && res?.code === 20000) {
          setRows(buildOperateRows(res.data?.content ?? []))
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
      <Table<OperateOrgRow>
        bordered
        rowKey='key'
        columns={columns}
        dataSource={rows}
        loading={loading}
        scroll={{ x: 2100 }}
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

export default OperateOrgTable
