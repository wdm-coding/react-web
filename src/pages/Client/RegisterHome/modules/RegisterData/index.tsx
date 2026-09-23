import { Table } from 'antd'
import type { TableProps } from 'antd'
import styles from './index.module.scss'

interface RegisterDataItem {
  [key: string]: any
}
const columns: TableProps<RegisterDataItem>['columns'] = [
  {
    title: '登记地区',
    dataIndex: 'dataRegistName',
    key: 'dataRegistName'
  },
  {
    title: '登记申请（个）',
    dataIndex: 'dataRegistApplyCount',
    key: 'dataRegistApplyCount'
  },
  {
    title: '登记公示（个）',
    dataIndex: 'publicityCount',
    key: 'publicityCount'
  },
  {
    title: '异议申诉（个）',
    dataIndex: 'objectionCountCount',
    key: 'objectionCount'
  },
  {
    title: '确认单发放（项）',
    dataIndex: 'confirmCountCount',
    key: 'confirmCountCount'
  }
]
const RegisterData: React.FC<{ dataSource: RegisterDataItem[] }> = ({
  dataSource
}) => {
  return (
    <div className={styles.registerDataWrapper}>
      <div className={styles.registerDataTitle}>登记数据一览</div>
      <div className={styles.registerDataList}>
        <Table<RegisterDataItem>
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 55 * 5 }}
          pagination={false}
          rowClassName='registerDataRow'
        />
      </div>
    </div>
  )
}
export default RegisterData
