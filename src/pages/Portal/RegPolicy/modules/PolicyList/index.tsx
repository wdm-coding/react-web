import { Button, List, Tag } from 'antd'
import dayjs from 'dayjs'
import type { PolicyItem } from '@/api/portal/regPolicy'
import styles from './index.module.scss'

interface Props {
  list: PolicyItem[]
  loading?: boolean
  pageNum: number
  pageSize: number
  total: number
  onPageChange: (pageNum: number) => void
  /** 查看政策详情 */
  onDetail: (item: PolicyItem) => void
}

/** 富文本内容转纯文本，用于列表摘要展示 */
const htmlToText = (html?: string) => {
  if (!html) return ''
  return (
    new DOMParser().parseFromString(html, 'text/html').body.textContent ?? ''
  )
}

/** 登记政策列表：标题、摘要、发布日期/分类、查看详情 */
const PolicyList = ({
  list,
  loading = false,
  pageNum,
  pageSize,
  total,
  onPageChange,
  onDetail
}: Props) => (
  <List<PolicyItem>
    className={styles.list}
    dataSource={list}
    loading={loading}
    rowKey='policyId'
    pagination={{
      className: styles.pagination,
      current: pageNum,
      pageSize,
      total,
      showSizeChanger: false,
      onChange: onPageChange
    }}
    renderItem={(item) => (
      <List.Item className={styles.listItem}>
        <div className={styles.title} onClick={() => onDetail(item)}>
          {item.title}
        </div>
        <div className={styles.direction}>{htmlToText(item.content)}</div>
        <div className={styles.bottom}>
          <div className={styles.meta}>
            <span className={styles.date}>
              {dayjs(item.publishTime).format('YYYY-MM-DD')}
            </span>
            {item.classificationName && (
              <Tag className={styles.tag} color='blue' variant='filled'>
                {item.classificationName}
              </Tag>
            )}
          </div>
          <Button
            type='link'
            className={styles.detailButton}
            onClick={() => onDetail(item)}
          >
            查看详情→
          </Button>
        </div>
      </List.Item>
    )}
  />
)

export default PolicyList
