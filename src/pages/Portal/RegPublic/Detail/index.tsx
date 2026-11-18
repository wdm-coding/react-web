import { useEffect, useState } from 'react'
import { Breadcrumb, Button, Descriptions, Spin, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import HomeApi, { type PublicityDetail } from '@/api/front/home.api'
import useAuth from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import resourceIcon from '@/assets/images/portal/resource-title-icon.png'
import signet from '@/assets/images/portal/publicity-signet.png'
import styles from './index.module.scss'

const formatDate = (value?: string) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '-'

const getRegistTypeName = (type?: string) =>
  type === '1' ? '公共数据资源' : '公共数据产品和服务'

const RegPublicDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isLoggedIn } = useAuth()
  const { authModal } = useModal('global')
  const publiclyInfoId = searchParams.get('publiclyInfoId') || ''
  const [detail, setDetail] = useState<PublicityDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!publiclyInfoId) {
      setLoading(false)
      return
    }
    let ignore = false
    const fetchDetail = async () => {
      try {
        const res = await HomeApi.getPublicityDetail({ publiclyInfoId })
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
  }, [publiclyInfoId])

  // 异议申诉：未登录时先引导登录
  const handleObjection = () => {
    if (!detail?.canObjectionApply) return
    if (!isLoggedIn) {
      window.$message.warning('请先登录，再提交异议')
      authModal.open()
      return
    }
    window.$message.info('异议申诉功能暂未开放')
  }

  const descriptionItems = detail
    ? [
        { key: '1', label: '登记数据名称', children: detail.dataRegistName },
        { key: '2', label: '登记主体名称', children: detail.institutionName },
        {
          key: '3',
          label: '行业分类',
          children: detail.industrys?.join(', ') || '-'
        },
        {
          key: '4',
          label: '登记数据类型',
          children: getRegistTypeName(detail.dataRegistType)
        },
        {
          key: '5',
          label: '公示周期',
          children: `${formatDate(detail.startDate)} - ${formatDate(detail.endDate)}`
        },
        {
          key: '6',
          label: '公示状态',
          children: detail.publicityStatus || '-'
        },
        {
          key: '7',
          label: '资源覆盖地区',
          children: detail.areas?.join('-') || '-'
        },
        { key: '8', label: '登记平台', children: detail.platformName || '-' },
        {
          key: '9',
          label: '登记机构',
          children: detail.organizationName || '-',
          span: 2
        },
        {
          key: '10',
          label: '数据内容简介',
          span: 2,
          children: (
            <Tooltip
              title={detail.dataContentIntroduction}
              styles={{ root: { maxWidth: 1080, minWidth: 800 } }}
            >
              <div className={styles.dataContentIntroduction}>
                {detail.dataContentIntroduction || '-'}
              </div>
            </Tooltip>
          )
        }
      ]
    : []

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Breadcrumb
            separator='>'
            items={[
              { title: <Link to='/portal/home'>首页</Link> },
              { title: <Link to='/portal/regPublic'>登记公示</Link> },
              {
                title: (
                  <span className={styles.breadcrumbCurrent}>公示信息</span>
                )
              }
            ]}
          />
        </div>
        <div className={styles.box}>
          {loading ? (
            <div className={styles.placeholder}>
              <Spin />
            </div>
          ) : detail ? (
            <>
              <div className={styles.title}>
                <img className={styles.titleIcon} src={resourceIcon} alt='' />
                <span>{detail.dataRegistName}</span>
                <Tag color='purple' variant='filled' className={styles.tag}>
                  {getRegistTypeName(detail.dataRegistType)}
                </Tag>
              </div>
              <div className={styles.content}>
                <Descriptions
                  bordered
                  size='small'
                  column={2}
                  items={descriptionItems}
                />
              </div>
              <div className={styles.button}>
                {detail.publicityStatus === '公示中' && (
                  <Button
                    className={styles.submit}
                    color='danger'
                    variant='solid'
                    disabled={!detail.canObjectionApply}
                    style={{
                      cursor: detail.canObjectionApply
                        ? 'pointer'
                        : 'not-allowed',
                      backgroundColor: detail.canObjectionApply
                        ? '#f54747'
                        : '#999'
                    }}
                    onClick={handleObjection}
                  >
                    异议申诉
                  </Button>
                )}
                <Button className={styles.cancel} onClick={() => navigate(-1)}>
                  返回
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.placeholder}>暂无数据</div>
          )}
        </div>
        {detail?.publicityStatus === '公示中' && (
          <img className={styles.signet} src={signet} alt='' />
        )}
      </div>
    </div>
  )
}

export default RegPublicDetail
