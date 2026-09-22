import { Card } from 'antd'
import { useUserStore } from '@/store/userStore'
import ScrollList from '@/pages/Client/RegisterHome/components/ScrollList'
import styles from './index.module.scss'
import { registerPublicDataSource } from '@/pages/Client/RegisterHome/db/registerPublic'
const Home: React.FC = () => {
  const username = useUserStore((state) => state.userInfo?.username)
  return (
    <div className={styles.homeWrapper}>
      <Card className='w-1/3 h-1/3'>
        <div>欢迎来到首页1，{username}</div>
      </Card>
      <div className={styles.scrollListWrapper}>
        <ScrollList>
          {registerPublicDataSource.map((item) => (
            <div className={styles.listItem} key={item.dataRegistId}>
              {item.dataRegistName}
            </div>
          ))}
        </ScrollList>
      </div>
    </div>
  )
}
export default Home
