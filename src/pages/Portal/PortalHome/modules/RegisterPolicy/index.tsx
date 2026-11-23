import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import RegPolicyApi, { type PolicyItem } from '@/api/portal/regPolicy'
import SectionHeader from '../../../components/SectionHeader'
import MoreLink from '../../../components/MoreLink'
import styles from './index.module.scss'

const formatDate = (value: string) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '-'

const RegisterPolicy = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<PolicyItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true)
      try {
        const { code, data } = await RegPolicyApi.getPolicyList({
          pageNum: 1,
          pageSize: 9,
          policyStatus: 0
        })
        if (code === 20000 && data?.content) {
          setList(data.content)
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [])

  // 第一条数据显示在左侧封面，右侧固定展示 8 条（不足补空行）
  const coverPolicy = list[0] ?? null
  const visibleList = list.slice(1, 9)
  const displayList = Array.from(
    { length: 8 },
    (_, index) => visibleList[index] ?? null
  )

  const goDetail = (policy: PolicyItem) => {
    navigate(`/portal/regPolicyDetail?policyId=${policy.policyId}`, {
      state: { policy }
    })
  }

  return (
    <section className={styles.policySection}>
      <SectionHeader title='登记政策' />

      <div className={styles.contentWrapper}>
        {loading ? (
          <div className={styles.placeholder}>
            <Spin />
          </div>
        ) : (
          <>
            <div className={styles.cover}>
              {coverPolicy && (
                <div
                  className={styles.coverInfo}
                  onClick={() => coverPolicy && goDetail(coverPolicy)}
                >
                  <span className={styles.coverName}>{coverPolicy.title}</span>
                  <span className={styles.coverDate}>
                    {formatDate(coverPolicy.publishTime)}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.policyList}>
              {displayList.map((item, index) =>
                item ? (
                  <div
                    className={`${styles.policyItem} ${index === visibleList.length - 1 ? styles.policyItemLast : ''}`}
                    key={item.policyId}
                    onClick={() => goDetail(item)}
                  >
                    <span className={styles.policyTitle}>{item.title}</span>
                    <span className={styles.policyDate}>
                      {formatDate(item.publishTime)}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`${styles.policyItem} ${styles.policyItemEmpty}`}
                    key={`empty-${index}`}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>

      <MoreLink to='/portal/regPolicy' />
    </section>
  )
}

export default RegisterPolicy
