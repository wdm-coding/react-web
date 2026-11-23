import { useState } from 'react'
import { Button, Modal } from 'antd'
import SectionHeader from '../../../components/SectionHeader'
import g01 from '@/assets/images/regGuide/g_01.png'
import g02 from '@/assets/images/regGuide/g_02.png'
import g03 from '@/assets/images/regGuide/g_03.png'
import g04 from '@/assets/images/regGuide/g_04.png'
import g05 from '@/assets/images/regGuide/g_05.png'
import g06 from '@/assets/images/regGuide/g_06.png'
import styles from './index.module.scss'

/** 登记指南配置项 */
export interface RegistGuideItem {
  id?: string
  title: string
  description?: string
  detail?: string
  icon?: string
  index?: number
}

interface Props {
  list: RegistGuideItem[]
}

const GUIDE_ICONS = [g01, g02, g03, g04, g05, g06]

const GuideSection = ({ list }: Props) => {
  const [activeGuide, setActiveGuide] = useState<RegistGuideItem | null>(null)

  return (
    <section className={styles.guideSection}>
      <SectionHeader title='公共数据登记指南' />
      <p className={styles.subtitle}>
        面向于行政事业单位与公共数据授权运营单位主体登记
      </p>

      <div className={styles.cardList}>
        {list.map((item, index) => (
          <div
            className={styles.card}
            key={item.id}
            onClick={() => setActiveGuide(item)}
          >
            <img
              className={styles.icon}
              src={GUIDE_ICONS[item.index ?? index]}
              alt={item.title}
            />
            <span className={styles.name}>{item.title}</span>
            <span className={styles.desc}>{item.description}</span>
            <span className={styles.link}>查看详情</span>
          </div>
        ))}
      </div>

      <Modal
        open={!!activeGuide}
        title={activeGuide?.title}
        width={1000}
        style={{ top: 100 }}
        onCancel={() => setActiveGuide(null)}
        styles={{
          header: {
            marginBottom: 0,
            paddingBottom: 18,
            borderBottom: '1px solid #e7e7e7'
          },
          body: { padding: '20px 10px' },
          footer: {
            marginTop: 0,
            padding: '18px 0 0',
            borderTop: '1px solid #e7e7e7'
          }
        }}
        footer={[
          <Button
            key='close'
            type='primary'
            onClick={() => setActiveGuide(null)}
          >
            关 闭
          </Button>
        ]}
      >
        <div className={styles.detail}>{activeGuide?.detail}</div>
      </Modal>
    </section>
  )
}

export default GuideSection
