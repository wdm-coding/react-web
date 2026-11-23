import { List, Tag, Tooltip } from 'antd'
import { DATA_REGIST_TYPE_MAP } from '@/dict'
import type { ResourceItem } from '@/api/portal/regQuery'
import styles from './index.module.scss'

interface Props {
  list: ResourceItem[]
  loading?: boolean
  pageNum: number
  pageSize: number
  total: number
  onPageChange: (pageNum: number, pageSize: number) => void
  /** 点击列表项，进入资源详情 */
  onItemClick?: (item: ResourceItem) => void
}

/** 资源查询结果列表：卡片式列表 + 分页 */
const ResourceList = ({
  list,
  loading = false,
  pageNum,
  pageSize,
  total,
  onPageChange,
  onItemClick
}: Props) => (
  <div className={styles.listBox}>
    <div className={styles.title}>
      共有<span className={styles.number}>{total}</span>条数据资源
    </div>
    <List<ResourceItem>
      className={styles.list}
      dataSource={list}
      loading={loading}
      split={false}
      pagination={{
        current: pageNum,
        pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 40, 50],
        onChange: onPageChange
      }}
      renderItem={(item) => {
        const introduction = item.dataContentIntroduction || '-'
        return (
          <List.Item
            className={styles.listItem}
            onClick={() => onItemClick?.(item)}
          >
            <div className={styles.itemMain}>
              <div className={styles.itemTitle}>
                <span className={styles.itemName}>{item.dataRegistName}</span>
                <Tag
                  variant='filled'
                  color={item.dataRegistType === '1' ? 'purple' : 'blue'}
                  className={styles.tag}
                >
                  {DATA_REGIST_TYPE_MAP[item.dataRegistType] ??
                    item.dataRegistType}
                </Tag>
              </div>
              <div className={styles.itemDesc}>
                <span className={styles.label}>数据简介：</span>
                <Tooltip
                  title={item.dataContentIntroduction}
                  placement='topLeft'
                  color='#ffffff'
                  styles={{
                    root: { maxWidth: 'none' },
                    container: {
                      width: 'min(1046px, 70vw)',
                      padding: '12px 16px',
                      lineHeight: '22px'
                    }
                  }}
                >
                  <div className={styles.ellipsis}>{introduction}</div>
                </Tooltip>
              </div>
              <div className={styles.itemDesc}>
                登记主体：{item.institutionName}
              </div>
            </div>
          </List.Item>
        )
      }}
    />
  </div>
)

export default ResourceList
