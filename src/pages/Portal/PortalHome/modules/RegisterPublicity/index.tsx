import { useEffect, useState } from 'react'
import { Spin, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import RegPublicApi, { type RegPublicItem } from '@/api/portal/regPublic'
import { DATA_REGIST_TYPE_MAP } from '@/dict'
import rpaIcon from '@/assets/images/registerHome/rpa_icon.png'
import SectionHeader from '../../../components/SectionHeader'
import MoreLink from '../../../components/MoreLink'
import styles from './index.module.scss'

const formatDate = (value: string) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '-'

const RegisterPublicity = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<RegPublicItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true)
      try {
        const { code, data } = await RegPublicApi.getPublicityList({
          pageNum: 1,
          pageSize: 12,
          sortDirection: 'ASC',
          sortField: 'CREATE_TIME'
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

  // 复制一份数据用于实现无缝滚动
  const loopList = list.length ? [...list, ...list] : []

  return (
    <section className={styles.publicitySection}>
      <SectionHeader title='登记公示' />
      <p className={styles.subtitle}>公示期为10个工作日</p>

      <div className={styles.marqueeWrapper}>
        {loading ? (
          <div className={styles.placeholder}>
            <Spin />
          </div>
        ) : loopList.length ? (
          <div
            className={styles.marqueeTrack}
            style={{ animationDuration: `${loopList.length * 9}s` }}
          >
            {loopList.map((item, index) => (
              <div
                className={styles.cardWrapper}
                key={`${item.publicityInfoId}-${index}`}
                onClick={() =>
                  navigate(
                    `/portal/regPublicDetail?publiclyInfoId=${item.publicityInfoId}`
                  )
                }
              >
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <img className={styles.cardIcon} src={rpaIcon} alt='' />
                    <Tooltip title={item.dataRegistName}>
                      <span className={styles.cardName}>
                        {item.dataRegistName}
                      </span>
                    </Tooltip>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>登记类型：</span>
                    <span>
                      {DATA_REGIST_TYPE_MAP[item.dataRegistType] ||
                        item.dataRegistType}
                    </span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>登记主体：</span>
                    <span>{item.institutionName}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>公示周期：</span>
                    <span>
                      {formatDate(item.startDate)} 至 {formatDate(item.endDate)}
                    </span>
                  </div>
                  <div className={styles.desc}>
                    <span className={styles.label}>数据内容简介：</span>
                    <p>{item.dataContentIntroduction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.placeholder}>暂无数据</div>
        )}
      </div>

      <MoreLink to='/portal/regPublic' />
    </section>
  )
}

export default RegisterPublicity
