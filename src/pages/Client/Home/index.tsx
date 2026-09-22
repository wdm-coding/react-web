import { Card } from 'antd'
import { useUserStore } from '@/store/userStore'
import styles from './index.module.scss'
import { registerPublicDataSource } from '@/pages/Client/RegisterHome/db/registerPublic'
import HorizontalVirtualLoop from '@/components/HorizontalVirtualLoop'
const Home: React.FC = () => {
  const username = useUserStore((state) => state.userInfo?.username)
  return (
    <div className={styles.homeWrapper}>
      <Card className='w-1/3 h-1/3'>
        <div>欢迎来到首页1，{username}</div>
      </Card>
      <div className={styles.scrollListWrapper}>
        <HorizontalVirtualLoop
          items={registerPublicDataSource}
          itemWidth={434}
          itemGap={20}
          speed={55}
          width={1342}
          height={338}
          renderItem={(item) => (
            <div className={styles.registerPublicItem}>
              {item?.dataRegistName}
            </div>
          )}
        />
      </div>
    </div>
  )
}
export default Home
