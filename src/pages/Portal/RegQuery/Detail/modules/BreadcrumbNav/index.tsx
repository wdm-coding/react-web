import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

export interface BreadcrumbNavItem {
  label: string
  /** 跳转地址，最后一级不传 */
  to?: string
}

interface Props {
  items: BreadcrumbNavItem[]
}

/** 详情页面包屑导航 */
const BreadcrumbNav = ({ items }: Props) => (
  <div className={styles.breadcrumb}>
    <Breadcrumb
      separator='>'
      items={items.map((item, index) => ({
        key: index,
        title:
          item.to && index !== items.length - 1 ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )
      }))}
    />
  </div>
)

export default BreadcrumbNav
