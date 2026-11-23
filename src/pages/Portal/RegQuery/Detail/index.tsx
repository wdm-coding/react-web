import { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RegQueryApi, { type ResourceDetail } from '@/api/portal/regQuery'
import BreadcrumbNav from './modules/BreadcrumbNav'
import DetailHeader from './modules/DetailHeader'
import DetailDescriptions from './modules/DetailDescriptions'
import styles from './index.module.scss'

const RegQueryDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dataRegistId = searchParams.get('dataRegistId') || ''
  const [detail, setDetail] = useState<ResourceDetail>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!dataRegistId) {
      setLoading(false)
      return
    }
    let ignore = false
    const fetchDetail = async () => {
      try {
        const res = await RegQueryApi.getResourceDetail({ dataRegistId })
        if (!ignore && res?.code === 20000) {
          setDetail(res.data)
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchDetail()
    return () => {
      ignore = true
    }
  }, [dataRegistId])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <BreadcrumbNav
          items={[
            { label: '首页', to: '/portal/home' },
            { label: '资源查询', to: '/portal/regQuery' },
            { label: '资源详情' }
          ]}
        />
        <div className={styles.box}>
          {loading ? (
            <div className={styles.placeholder}>
              <Spin />
            </div>
          ) : detail ? (
            <>
              <DetailHeader
                name={detail.dataRegistName}
                dataRegistType={detail.dataRegistType}
              />
              <DetailDescriptions detail={detail} />
              <div className={styles.button}>
                <Button
                  type='primary'
                  className={styles.back}
                  onClick={() => navigate(-1)}
                >
                  返回资源列表
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.placeholder}>暂无数据</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegQueryDetail
