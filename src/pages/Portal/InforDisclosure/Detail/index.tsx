import { Breadcrumb } from 'antd'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import type { DisclosureTabKey } from '../types'
import ExecuteOrgTable from './modules/ExecuteOrgTable'
import OperateOrgTable from './modules/OperateOrgTable'
import styles from './index.module.scss'

interface LocationState {
  activeKey?: DisclosureTabKey
  id?: string
}

const InforDisclosureDetail = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const state = (location.state as LocationState | null) ?? {}

  const activeKey: DisclosureTabKey =
    state.activeKey === 'opt' || searchParams.get('type') === 'opt'
      ? 'opt'
      : 'imp'
  const id = state.id ?? searchParams.get('id') ?? ''
  const orgLabel = activeKey === 'imp' ? '实施' : '运营'

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb
          className={styles.breadcrumb}
          separator='>'
          items={[
            { title: <Link to='/portal/home'>首页</Link> },
            { title: <Link to='/portal/inforDisclosure'>信息披露</Link> },
            {
              title: (
                <span className={styles.breadcrumbCurrent}>
                  {orgLabel}机构详情
                </span>
              )
            }
          ]}
        />
        <div className={styles.mainPage}>
          <div className={styles.title}>
            <div className={styles.bar} />
            <div className={styles.titleText}>{orgLabel}机构信息披露详情</div>
            <div className={styles.bar} />
          </div>
          {activeKey === 'imp' ? (
            <ExecuteOrgTable id={id} />
          ) : (
            <OperateOrgTable id={id} />
          )}
        </div>
      </div>
    </div>
  )
}

export default InforDisclosureDetail
