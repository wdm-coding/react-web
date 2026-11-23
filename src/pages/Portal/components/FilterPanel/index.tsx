import { useState } from 'react'
import styles from './index.module.scss'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterRow {
  key: string
  label: string
  options: FilterOption[]
  /** 当前取值，null 表示“全部” */
  value: string | null
  onChange: (value: string | null) => void
}

interface Props {
  rows: FilterRow[]
  /** “全部”的文案 */
  allLabel?: string
  className?: string
}

/** 门户通用查询条件面板：行式筛选，支持展开/收起 */
const FilterPanel = ({ rows, allLabel = '全部', className }: Props) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`${styles.categoryBox} ${expanded ? styles.expanded : ''} ${className ?? ''}`}
    >
      <div className={styles.category}>
        {rows.map((row) => (
          <div className={styles.row} key={row.key}>
            <div className={styles.left}>{row.label}</div>
            <div className={styles.right}>
              <span
                className={`${styles.item} ${row.value === null ? styles.selected : styles.unselect}`}
                onClick={() => row.onChange(null)}
              >
                {allLabel}
              </span>
              {row.options.map((option) => {
                const active = row.value === option.value
                return (
                  <span
                    key={option.value}
                    className={`${styles.item} ${active ? styles.selected : styles.unselect}`}
                    onClick={() => row.onChange(active ? null : option.value)}
                  >
                    {option.label}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        className={styles.expandBtn}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? '收起' : '展开'}
      </div>
    </div>
  )
}

export default FilterPanel
