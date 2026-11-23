import { Tabs } from 'antd'
import styles from './index.module.scss'

/** 分类标签项 */
export interface CategoryTabItem {
  /** 分类唯一标识 */
  key: string
  /** 分类名称 */
  label: string
}

interface Props {
  items: CategoryTabItem[]
  /** 当前选中的分类标识 */
  value?: string
  /** 分类切换回调 */
  onChange?: (key: string) => void
  className?: string
}

/** 门户通用分类标签栏：数据驱动，可用于各类列表页的分类筛选 */
const CategoryTabs = ({ items, value, onChange, className }: Props) => {
  return (
    <Tabs
      className={`${styles.tabs} ${className ?? ''}`}
      items={items}
      activeKey={value}
      onChange={onChange}
    />
  )
}

export default CategoryTabs
