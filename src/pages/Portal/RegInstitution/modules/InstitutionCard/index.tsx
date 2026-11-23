import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import type { InstitutionItem } from '@/api/portal/regInstitution'
import styles from './index.module.scss'

interface Props {
  item: InstitutionItem
}

/** 登记范围：接口返回 JSON 数组字符串，拼接后展示 */
const formatArea = (area?: string) => {
  if (!area?.trim()) return '-'
  try {
    const parsed = JSON.parse(area)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.join('') : '-'
  } catch {
    return '-'
  }
}

/** 登记机构卡片：机构名称 + 联系电话 / 联系地址 / 登记范围 */
const InstitutionCard = ({ item }: Props) => {
  const items: DescriptionsProps['items'] = [
    {
      key: 'phone',
      label: '联系电话',
      children: item.phone || '-',
      span: 2
    },
    {
      key: 'address',
      label: '联系地址',
      children: item.address || '-',
      span: 1
    },
    {
      key: 'area',
      label: '登记范围',
      children: formatArea(item.area),
      span: 3
    }
  ]

  return (
    <Descriptions
      className={styles.descriptions}
      title={item.organizationName}
      column={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }}
      items={items}
    />
  )
}

export default InstitutionCard
