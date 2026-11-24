import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'
import DetailCard from './modules/DetailCard'
import columns from './columns'
import regApplyApi from '@/api/regApply'
import { useRequest } from '@/hooks/useRequest'
const RegApplyDetail = () => {
  const location = useLocation()
  const { dataRegistId, regApproType } = location?.state || {}
  console.log(dataRegistId, regApproType)
  const { data: detail } = useRequest(() =>
    regApplyApi.getRegApplyDetail({
      dataRegistId
    })
  )

  return (
    <PageContainer title='登记详情'>
      <div className={styles.regApplyDetailWrapper}>
        <DetailCard
          title='数据基本信息'
          detailData={detail}
          columns={columns?.baseData || []}
        />
        <DetailCard
          title='委托代理信息'
          detailData={detail}
          columns={columns?.proxyData || []}
        />
        <DetailCard
          title='数据存储信息'
          detailData={detail}
          columns={columns?.storageData || []}
        />
        <DetailCard
          title='数据场景说明'
          detailData={detail}
          columns={columns?.sceneData || []}
        />
        <DetailCard
          title='共有数据信息'
          detailData={detail}
          columns={columns?.sharedData || []}
        />
        <DetailCard
          title='数据共享开放信息'
          detailData={detail}
          columns={columns?.openData || []}
        />
        <DetailCard
          title='数据目录信息'
          detailData={detail}
          columns={columns?.direcData || []}
        />
        <DetailCard
          title='数据合规性来源及承诺'
          detailData={detail}
          columns={columns?.sourceData || []}
        />
      </div>
    </PageContainer>
  )
}
export default RegApplyDetail
