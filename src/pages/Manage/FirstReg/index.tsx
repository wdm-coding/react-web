import styles from './index.module.scss'
import RegForm from './modules/RegForm'
import PageTitle from '@/layouts/ManageLayout/PageTitle'
const FirstReg = () => {
  return (
    <>
      <PageTitle
        title='登记申请'
        extra={
          <span>
            标有红色<span style={{ color: 'red' }}> * </span>
            的字段为必填项，需要完整填写;不带*字段为选填，无相关信息可不填写。
          </span>
        }
      />
      <div className={styles.firstRegWrapper}>
        <RegForm />
      </div>
    </>
  )
}

export default FirstReg
