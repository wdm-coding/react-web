import styles from './index.module.scss'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
import RegGuide from './modules/RegGuide'
import SubjectInfo from './modules/SubjectInfo'
import TodoItems from './modules/TodoItems'
import UserMessage from './modules/UserMessage'

const RegApplyList = () => {
  return (
    <PageContainer title='首页' showBack={false}>
      <div className={styles.manageHomeWrapper}>
        <RegGuide />
        <SubjectInfo />
        <TodoItems />
        <UserMessage />
      </div>
    </PageContainer>
  )
}
export default RegApplyList
