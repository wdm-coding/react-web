import styles from './index.module.scss'
import RegForm from './modules/RegForm'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
const FirstReg = () => {
  return (
    <PageContainer
        title='登记申请'
        contentStyle={{ padding: '20px' }}
        extra={
          <span>
            标有红色<span style={{ color: 'red' }}> * </span>
            的字段为必填项，需要完整填写;不带*字段为选填，无相关信息可不填写。
          </span>
        }
      >
        <div className={styles.firstRegWrapper}>
          <RegForm />
        </div>
      </PageContainer>
  )
}

export default FirstReg
