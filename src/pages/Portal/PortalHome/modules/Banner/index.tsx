import { Button } from 'antd'
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import c01 from '@/assets/images/registerHome/c_01.png'
import c02 from '@/assets/images/registerHome/c_02.png'
import c03 from '@/assets/images/registerHome/c_03.png'
import c04 from '@/assets/images/registerHome/c_04.png'
import useAuth from '@/hooks/useAuth'
import HomeApi, { type SignInCount } from '@/api/front/home.api'
import styles from './index.module.scss'

interface StatItem {
  key: string
  field: keyof SignInCount
  label: string
  unit: string
  icon: string
}

const STAT_LIST: StatItem[] = [
  {
    key: 'apply',
    field: 'applyForCount',
    label: '登记申请',
    unit: '项',
    icon: c01
  },
  {
    key: 'publicity',
    field: 'publicityCount',
    label: '登记公示',
    unit: '个',
    icon: c02
  },
  {
    key: 'appeal',
    field: 'appealCount',
    label: '异议申诉',
    unit: '个',
    icon: c03
  },
  {
    key: 'confirm',
    field: 'successCount',
    label: '确认单发放',
    unit: '项',
    icon: c04
  }
]

const Banner = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [counts, setCounts] = useState<SignInCount | null>(null)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { code, data } = await HomeApi.getSignInCount()
        if (code === 20000 && data) {
          setCounts(data)
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      }
    }
    fetchCounts()
  }, [])

  const handleApply = () => {
    navigate(isLoggedIn ? '/manage/firstReg' : '/login')
  }

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>
          建立公共数据资源“一本账”，
          <br />
          促进公共数据资源高效开发利用
        </h1>
        <Button
          type='primary'
          className={styles.applyBtn}
          icon={<EditOutlined />}
          onClick={handleApply}
        >
          申请登记
          <ArrowRightOutlined className={styles.applyArrow} />
        </Button>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          {STAT_LIST.map((item) => (
            <div className={styles.statItem} key={item.key}>
              <img
                className={styles.statIcon}
                src={item.icon}
                alt={item.label}
              />
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>{item.label}</span>
                <span className={styles.statValue}>
                  {counts?.[item.field] ?? 0}
                  <em className={styles.statUnit}>{item.unit}</em>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banner
