import { Button, Pagination, Table, type TableColumnsType } from 'antd'
import { DATA_REGIST_TYPE_MAP } from '@/dict'
import type { RegPublicItem } from '@/api/portal/regPublic'
import styles from './index.module.scss'

interface Props {
  list: RegPublicItem[]
  loading?: boolean
  isLoggedIn?: boolean
  pageNum: number
  pageSize: number
  total: number
  onPageChange: (pageNum: number, pageSize: number) => void
  onDetail: (item: RegPublicItem) => void
  onObjection: (item: RegPublicItem) => void
}

const PublicityTable = ({
  list,
  loading = false,
  isLoggedIn = false,
  pageNum,
  pageSize,
  total,
  onPageChange,
  onDetail,
  onObjection
}: Props) => {
  /** 公示中或已登录时按 canObjectionApply 判断，未登录且非公示中时保持可点击（点击后提示登录） */
  const isObjectionDisabled = (record: RegPublicItem) =>
    record.publicityStatus !== '1' || isLoggedIn
      ? !record.canObjectionApply
      : false

  const columns: TableColumnsType<RegPublicItem> = [
    {
      title: '序号',
      key: 'serialNumber',
      width: 80,
      align: 'center',
      render: (_, __, index) => (pageNum - 1) * pageSize + index + 1
    },
    {
      title: '登记数据名称',
      dataIndex: 'dataRegistName',
      key: 'dataRegistName',
      ellipsis: true
    },
    {
      title: '登记数据类型',
      dataIndex: 'dataRegistType',
      key: 'dataRegistType',
      width: 200,
      render: (value: string) => DATA_REGIST_TYPE_MAP[value] ?? value
    },
    {
      title: '登记主体名称',
      dataIndex: 'institutionName',
      key: 'institutionName',
      width: 330,
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => {
        return (
          <div className={styles.action}>
            <Button
              type='link'
              style={{ paddingLeft: 0 }}
              onClick={() => onDetail(record)}
            >
              详情
            </Button>
            <Button
              type='link'
              danger
              style={{ paddingLeft: 10 }}
              disabled={isObjectionDisabled(record)}
              onClick={() => onObjection(record)}
            >
              异议申诉
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className={styles.listBox}>
      <div className={styles.title}>
        共有<span className={styles.number}>{total}</span>条公示信息
      </div>
      <Table<RegPublicItem>
        className={styles.table}
        rowKey='publicityInfoId'
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={false}
      />
      <Pagination
        className={styles.pagination}
        current={pageNum}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[10, 20, 30, 40, 50]}
        onChange={onPageChange}
        onShowSizeChange={onPageChange}
      />
    </div>
  )
}

export default PublicityTable
