import styles from './index.module.scss'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
const InstUserList = () => {
  return (
    <PageContainer title='机构用户管理' showBack={false}>
      <div className={styles.userList}>机构用户管理</div>
    </PageContainer>
  )
}
export default InstUserList
