import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import SystemApi, { type SystemConfigItem } from '@/api/system'
import SearchHeader from '../components/SearchHeader'
import GuideSection, { type RegistGuideItem } from './modules/GuideSection'
import FaqSection, { type QuestionItem } from './modules/FaqSection'
import bannerBg from '@/assets/images/portal/guide-bg.png'
import styles from './index.module.scss'

/** 解析系统配置中指定 mark 的 JSON 值 */
const parseSystemConfig = <T,>(list: SystemConfigItem[], mark: string): T[] =>
  list
    .filter((item) => item.mark === mark && typeof item.value === 'string')
    .flatMap((item) => {
      try {
        return [JSON.parse(item.value) as T]
      } catch {
        return []
      }
    })

const RegGuide = () => {
  const [guides, setGuides] = useState<RegistGuideItem[]>([])
  const [questions, setQuestions] = useState<QuestionItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const fetchConfig = async () => {
      try {
        const res = await SystemApi.getSystemConfig({ pageSize: 999 })
        if (!ignore && res?.code === 20000 && res.data?.content) {
          const { content } = res.data
          setGuides(
            parseSystemConfig<RegistGuideItem>(content, 'registGuide').sort(
              (a, b) => (a.index ?? 0) - (b.index ?? 0)
            )
          )
          setQuestions(parseSystemConfig<QuestionItem>(content, 'question'))
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchConfig()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <SearchHeader bg={bannerBg}>
        <span className={styles.pageTitle}>登记指南</span>
      </SearchHeader>
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <Spin />
          </div>
        ) : (
          <>
            <GuideSection list={guides} />
            <FaqSection list={questions} />
          </>
        )}
      </div>
    </div>
  )
}

export default RegGuide
