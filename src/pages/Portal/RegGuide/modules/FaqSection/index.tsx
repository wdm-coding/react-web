import { Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import SectionHeader from '../../../components/SectionHeader'
import styles from './index.module.scss'

/** 常见问题配置项 */
export interface QuestionItem {
  id?: string
  title: string
  content?: string
  goWord?: string
  url?: string
}

interface Props {
  list: QuestionItem[]
}

const FaqSection = ({ list }: Props) => {
  const items = list.map((item, index) => ({
    key: item.id ?? String(index),
    label: item.title,
    children: (
      <div className={styles.answer}>
        <span>{item.content}</span>
      </div>
    )
  }))

  return (
    <section className={styles.faqSection}>
      <SectionHeader title='常见问题' />
      <Collapse
        className={styles.collapse}
        ghost
        accordion
        items={items}
        expandIconPosition='end'
        expandIcon={({ isActive }) => (
          <DownOutlined
            className={isActive ? styles.iconActive : styles.icon}
          />
        )}
      />
    </section>
  )
}

export default FaqSection
