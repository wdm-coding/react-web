import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Descriptions } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { DisclosureItem as DisclosureItemType } from '@/api/portal/inforDisclosure'
import type { DisclosureTabKey } from '../../types'
import styles from './index.module.scss'

interface Props {
  item: DisclosureItemType
  activeKey: DisclosureTabKey
}

/** 信息披露机构列表项 */
const DisclosureItem = ({ item, activeKey }: Props) => {
  const navigate = useNavigate()

  const goDetail = () => {
    navigate(`/portal/inforDisclosureDetail?id=${item.id}&type=${activeKey}`, {
      state: { activeKey, id: item.id }
    })
  }

  return (
    <div className={styles.listItem}>
      <div className={styles.orgName}>{item.disclosureName}</div>
      <Descriptions
        column={1}
        items={[
          {
            key: 'email',
            label: '邮箱',
            children: item.email ?? ''
          },
          {
            key: 'address',
            label: '地址',
            children: (
              <div className={styles.addressRow}>
                <span>{item.address ?? ''}</span>
                <Button
                  type='link'
                  size='small'
                  icon={<ArrowRightOutlined />}
                  iconPosition='end'
                  className={styles.detailButton}
                  onClick={goDetail}
                >
                  查看详情
                </Button>
              </div>
            )
          }
        ]}
      />
    </div>
  )
}

export default DisclosureItem
