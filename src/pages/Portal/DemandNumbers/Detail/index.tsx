import { Breadcrumb, Button, Descriptions, Tag } from 'antd'
import type { DescriptionsProps } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { DemandNumbersItem } from '@/api/portal/demandNumbers'
import demandDetailIcon from '@/assets/images/portal/demand_detail.png'
import { formatDateTime, getDataTypeLabel, maskUnitName } from '../utils'
import styles from './index.module.scss'

interface LocationState {
  record?: DemandNumbersItem
}

const Detail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const record = (location.state as LocationState | null)?.record

  const text = (value?: string) => value || '-'

  const items: DescriptionsProps['items'] = [
    {
      key: 'usingUnitName',
      label: '用数单位名称',
      children: maskUnitName(record?.usingUnitName) || '-'
    },
    { key: 'demandNo2', label: '需求编号', children: text(record?.demandNo2) },
    {
      key: 'demandName',
      label: '需求名称',
      children: text(record?.demandName)
    },
    {
      key: 'dataType',
      label: '数据类型',
      children: getDataTypeLabel(record?.dataType)
    },
    {
      key: 'industryName',
      label: '行业分类',
      children: text(record?.industryName)
    },
    {
      key: 'regionName',
      label: '区域范围',
      children: text(record?.regionName)
    },
    {
      key: 'demandOverview',
      label: '需求概述',
      span: 2,
      children: text(record?.demandOverview)
    },
    {
      key: 'createdTime',
      label: '发布日期',
      span: 2,
      children: formatDateTime(record?.createdTime)
    }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb
          className={styles.breadcrumb}
          separator='>'
          items={[
            { title: <Link to='/portal/home'>首页</Link> },
            { title: <Link to='/portal/demandNumbers'>用数需求</Link> },
            {
              title: <span className={styles.breadcrumbCurrent}>需求详情</span>
            }
          ]}
        />
        <div className={styles.box}>
          <div className={styles.title}>
            <img className={styles.icon} src={demandDetailIcon} alt='' />
            <span>需求详情</span>
            {record ? (
              <Tag className={styles.tag} bordered={false} color='purple'>
                {getDataTypeLabel(record.dataType)}
              </Tag>
            ) : null}
          </div>
          <Descriptions bordered size='small' column={2} items={items} />
          <div className={styles.back}>
            <Button
              type='primary'
              className={styles.backButton}
              onClick={() => navigate('/portal/demandNumbers')}
            >
              返回
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
