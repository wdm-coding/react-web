import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import RegForm from './modules/RegForm'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
import RegMatters from './modules/RegMatters'
import { useLocation, useParams } from 'react-router-dom'
import ApplyChangeModal from './modules/ApplyChangeModal'
const FirstReg = () => {
  const location = useLocation()
  const { type } = useParams()
  const [dataRegId, setDataRegId] = useState<string | null>(null)
  const [orgDataRegistId, setOrgDataRegistId] = useState<string | null>(null)
  const { dataRegistId, regApproType, applyChange } = location?.state || {}
  // 变更登记弹窗状态
  const [applyChangeOpen, setApplyChangeOpen] = useState<boolean>(false)
  const [applyChangeLoading, setApplyChangeLoading] = useState<boolean>(false)
  // regApproType 不存在时弹出登记须知
  const [mattersOpen, setMattersOpen] = useState(
    (regApproType === '1' || !regApproType) && !dataRegistId
  )
  useEffect(() => {
    setDataRegId(dataRegistId || '')
    if (type === 'add') {
      setMattersOpen((regApproType === '1' || !regApproType) && !dataRegistId)
    }
  }, [type, regApproType, dataRegistId])
  // 打开登记数据变化弹窗
  useEffect(() => {
    if (applyChange) {
      setApplyChangeOpen(true)
    }
  }, [applyChange])
  // 登记数据变化确认
  const onApplyChangeConfirm = async ({
    dataRegistId,
    orgDataRegistId
  }: {
    dataRegistId?: string
    orgDataRegistId?: string
  }) => {
    setDataRegId(dataRegistId || null)
    setOrgDataRegistId(orgDataRegistId || null)
    setApplyChangeLoading(true)
    setApplyChangeOpen(false)
    setApplyChangeLoading(false)
  }
  return (
    <PageContainer
      key={type}
      title='登记申请'
      extra={
        <span>
          标有红色<span style={{ color: 'red' }}> * </span>
          的字段为必填项，需要完整填写;不带*字段为选填，无相关信息可不填写。
        </span>
      }
    >
      <div className={styles.firstRegWrapper}>
        <RegForm
          key={dataRegId}
          dataRegistId={dataRegId}
          orgDataRegistId={orgDataRegistId}
          regApproType={regApproType}
          openChangeModal={(open) => setApplyChangeOpen(open)}
        />
        <RegMatters open={mattersOpen} onClose={() => setMattersOpen(false)} />
        {/* 获取变更数据弹窗 */}
        <ApplyChangeModal
          regApproType={regApproType}
          open={applyChangeOpen}
          onCancel={() => setApplyChangeOpen(false)}
          onConfirm={onApplyChangeConfirm}
          loading={applyChangeLoading}
        />
      </div>
    </PageContainer>
  )
}

export default FirstReg
