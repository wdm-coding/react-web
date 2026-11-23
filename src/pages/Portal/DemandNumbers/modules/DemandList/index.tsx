import { Table } from 'antd'
import type { TableProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { DemandNumbersItem } from '@/api/portal/demandNumbers'
import { formatDateTime, getDataTypeLabel, maskUnitName } from '../../utils'
import styles from './index.module.scss'

interface DemandListProps {
  data: DemandNumbersItem[]
  total: number
  loading: boolean
  pageNum: number
  pageSize: number
  onPageChange: (page: number, size: number) => void
}

const COLUMNS: TableProps<DemandNumbersItem>['columns'] = [
  {
    title: '用数单位名称',
    dataIndex: 'usingUnitName',
    key: 'usingUnitName',
    render: (value?: string) => maskUnitName(value)
  },
  {
    title: '需求名称',
    dataIndex: 'demandName',
    key: 'demandName',
    width: 280,
    ellipsis: true
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    key: 'dataType',
    render: (value?: string) => getDataTypeLabel(value)
  },
  { title: '行业分类', dataIndex: 'industryName', key: 'industryName' },
  { title: '区域范围', dataIndex: 'regionName', key: 'regionName' },
  {
    title: '发布日期',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (value?: string) => formatDateTime(value)
  }
]

const DemandList = ({
  data,
  total,
  loading,
  pageNum,
  pageSize,
  onPageChange
}: DemandListProps) => {
  const navigate = useNavigate()

  const columns: TableProps<DemandNumbersItem>['columns'] = [
    ...COLUMNS,
    {
      title: '操作',
      key: 'operation',
      width: 80,
      render: (_, record) => (
        <a
          onClick={() =>
            navigate('/portal/demandNumbersDetail', { state: { record } })
          }
        >
          详情
        </a>
      )
    }
  ]

  return (
    <div className={styles.listBox}>
      <Table<DemandNumbersItem>
        rowKey={(record) =>
          record.id ?? record.demandNo2 ?? record.demandName ?? ''
        }
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 900 }}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [10, 20, 30, 40, 50],
          onChange: onPageChange
        }}
      />
    </div>
  )
}

export default DemandList
