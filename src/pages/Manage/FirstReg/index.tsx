import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import RegForm from './modules/RegForm'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
import RegMatters from './modules/RegMatters'
import { useLocation, useParams } from 'react-router-dom'
const FirstReg = () => {
  const location = useLocation()
  const { type } = useParams()
  const { dataRegistId, regApproType } = location?.state || {}
  // regApproType 不存在时弹出登记须知
  const [mattersOpen, setMattersOpen] = useState(
    (regApproType === '1' || !regApproType) && !dataRegistId
  )
  useEffect(() => {
    if (type === 'add') {
      setMattersOpen((regApproType === '1' || !regApproType) && !dataRegistId)
    }
  }, [type, regApproType, dataRegistId])
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
        <RegForm dataRegistId={dataRegistId} regApproType={regApproType} />
        <RegMatters open={mattersOpen} onClose={() => setMattersOpen(false)} />
      </div>
    </PageContainer>
  )
}

export default FirstReg
