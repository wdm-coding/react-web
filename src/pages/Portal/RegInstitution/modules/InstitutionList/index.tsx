import { List } from 'antd'
import type { InstitutionItem } from '@/api/portal/regInstitution'
import InstitutionCard from '../InstitutionCard'
import styles from './index.module.scss'

interface Props {
  list: InstitutionItem[]
  loading?: boolean
  pageNum: number
  pageSize: number
  total: number
  onPageChange: (pageNum: number, pageSize: number) => void
}

/** 登记机构列表：机构卡片 + 分页 */
const InstitutionList = ({
  list,
  loading = false,
  pageNum,
  pageSize,
  total,
  onPageChange
}: Props) => (
  <List<InstitutionItem>
    className={styles.list}
    dataSource={list}
    loading={loading}
    split={false}
    rowKey='organizationId'
    pagination={{
      current: pageNum,
      pageSize,
      total,
      align: 'end',
      showSizeChanger: false,
      onChange: onPageChange
    }}
    renderItem={(item) => (
      <List.Item className={styles.listItem}>
        <InstitutionCard item={item} />
      </List.Item>
    )}
  />
)

export default InstitutionList
