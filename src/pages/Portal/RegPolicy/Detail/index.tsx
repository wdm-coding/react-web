import { useEffect, useState } from 'react'
import { Breadcrumb, Spin } from 'antd'
import dayjs from 'dayjs'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import RegPolicyApi, { type PolicyItem } from '@/api/portal/regPolicy'
import styles from './index.module.scss'

interface LocationState {
  policy?: PolicyItem
}

const formatDate = (value: string) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '-'

const RegPolicyDetail = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const locationPolicy = (location.state as LocationState | null)?.policy
  const [policy, setPolicy] = useState<PolicyItem | null>(
    locationPolicy ?? null
  )
  const [loading, setLoading] = useState(!locationPolicy)

  useEffect(() => {
    if (policy) return
    const policyId = searchParams.get('policyId')
    if (!policyId) {
      setLoading(false)
      return
    }
    const fetchDetail = async () => {
      try {
        const { code, data } = await RegPolicyApi.getPolicyList({
          pageNum: 1,
          pageSize: 50,
          policyStatus: 0
        })
        if (code === 20000 && data?.content) {
          setPolicy(
            data.content.find((item) => item.policyId === policyId) ?? null
          )
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [policy, searchParams])

  return (
    <div className={styles.wrapper}>
      <Breadcrumb
        className={styles.breadcrumb}
        items={[
          { title: <Link to='/portal/home'>首页</Link> },
          { title: <Link to='/portal/regPolicy'>登记政策</Link> },
          {
            title: <span className={styles.breadcrumbCurrent}>政策详情</span>
          }
        ]}
      />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.placeholder}>
            <Spin />
          </div>
        ) : policy ? (
          <article className={styles.article}>
            <h1 className={styles.title}>{policy.title}</h1>
            <div className={styles.meta}>
              {policy.source && <span>来源：{policy.source}</span>}
              <span>发布时间：{formatDate(policy.publishTime)}</span>
            </div>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />
          </article>
        ) : (
          <div className={styles.placeholder}>暂无数据</div>
        )}
      </div>
    </div>
  )
}

export default RegPolicyDetail
