import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

interface Props {
  /** 搜索关键词 */
  value?: string
  /** 输入框占位文案 */
  placeholder?: string
  /** 按钮文案 */
  buttonText?: string
  /** 是否加载中 */
  loading?: boolean
  /** 输入框宽度，可传数值或百分比 */
  width?: number | string
  /** 输入变化 */
  onChange?: (value: string) => void
  /** 点击搜索或回车 */
  onSearch?: () => void
}

/** 门户通用大搜索框（胶囊输入框 + 渐变按钮） */
const SearchBar = ({
  value,
  placeholder = '请输入搜索内容',
  buttonText = '搜索',
  loading = false,
  width = 700,
  onChange,
  onSearch
}: Props) => {
  return (
    <div className={styles.searchBox}>
      <Input
        className={styles.search}
        style={{ width }}
        value={value}
        placeholder={placeholder}
        allowClear
        onChange={(e) => onChange?.(e.target.value)}
        onPressEnter={onSearch}
      />
      <Button
        type='primary'
        className={styles.button}
        icon={<SearchOutlined />}
        loading={loading}
        onClick={onSearch}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default SearchBar
