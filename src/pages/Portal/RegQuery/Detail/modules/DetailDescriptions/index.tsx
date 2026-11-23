import { Descriptions, Tooltip } from 'antd'
import type { DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import { DATA_REGIST_TYPE_MAP } from '@/dict'
import type { ResourceDetail } from '@/api/portal/regQuery'
import styles from './index.module.scss'

interface Props {
  detail?: ResourceDetail
}

const formatDate = (value?: string) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '-'

/** 资源详情字段信息 */
const DetailDescriptions = ({ detail }: Props) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '登记数据名称',
      children: detail?.dataRegistName || '-'
    },
    {
      key: '2',
      label: '登记主体名称',
      children: detail?.institutionName || '-'
    },
    {
      key: '3',
      label: '行业分类',
      children: detail?.industry?.join(', ') || '-'
    },
    {
      key: '4',
      label: '登记数据类型',
      children: detail?.dataRegistType
        ? (DATA_REGIST_TYPE_MAP[detail.dataRegistType] ?? detail.dataRegistType)
        : '-'
    },
    {
      key: '5',
      label: '公示周期',
      children: `${formatDate(detail?.startDate)} - ${formatDate(detail?.endDate)}`
    },
    { key: '6', label: '公示状态', children: detail?.publicityStatus || '-' },
    {
      key: '7',
      label: '资源覆盖地区',
      children: detail?.areas?.join('-') || '-'
    },
    { key: '8', label: '登记平台', children: detail?.platformName || '-' },
    {
      key: '9',
      label: '登记机构',
      children: detail?.organizationName || '-',
      span: 2
    },
    {
      key: '10',
      label: '数据内容简介',
      span: 2,
      children: (
        <Tooltip
          title={detail?.dataContentIntroduction}
          styles={{ root: { maxWidth: 1080, minWidth: 800 } }}
        >
          <div className={styles.dataContentIntroduction}>
            {detail?.dataContentIntroduction || '-'}
          </div>
        </Tooltip>
      )
    }
  ]

  return (
    <div className={styles.content}>
      <Descriptions bordered size='small' column={2} items={items} />
    </div>
  )
}

export default DetailDescriptions
