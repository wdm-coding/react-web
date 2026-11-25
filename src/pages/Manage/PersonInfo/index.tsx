import styles from './index.module.scss'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
const PersonInfo = () => {
  return (
    <PageContainer title='个人信息' showBack={false}>
      <div className={styles.personInfo}>个人信息</div>
    </PageContainer>
  )
}
export default PersonInfo
