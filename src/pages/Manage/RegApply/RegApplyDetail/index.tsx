import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'
import DetailCard from './modules/DetailCard'
import columns from './columns'
import regApplyApi from '@/api/regApply'
import certManageApi from '@/api/certManage'
import { useRequest } from '@/hooks/useRequest'
import ProcessRecord from './modules/ProcessRecord'
import CertView from './modules/CertView'
const RegApplyDetail = () => {
  const location = useLocation()
  const { dataRegistId, regApproType, certificateId } = location?.state || {}
  // 获取登记数据详情
  const { data: detail } = useRequest(() =>
    regApplyApi.getRegApplyDetail({
      dataRegistId
    })
  )
  // 获取确认单详情
  const { data: certDetail } = useRequest(
    () => certManageApi.getProofDetail({ certificateId }),
    {
      ready: certificateId !== undefined
    }
  )

  return (
    <PageContainer title='登记详情'>
      <div className={styles.regApplyDetailWrapper}>
        {certificateId && certDetail && (
          <CertView
            certInfo={{
              dataRegistName: detail?.dataRegistName || '',
              certificateBase64: certDetail?.certificatePicBase64 || '',
              certificateCode: certDetail?.certificateCode || '',
              certificateStatus: certDetail?.certificateStatus || '',
              validityPeriodStartTime:
                certDetail?.validityPeriodStartTime || '',
              cvalidityDeadline: certDetail?.cvalidityDeadline || ''
            }}
          />
        )}
        <ProcessRecord
          regApproType={regApproType || detail?.regApproType || ''}
          status={detail?.status || ''}
          taskDetails={detail?.taskDetails || []}
        />
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
