import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import logo from '@/assets/images/common/logo.jpeg'
const Header = () => {
  const userStore = useUserStore()
  const onLogout = async () => {
    const isLogout = await userStore.userLogout()
    if (isLogout) {
      window.location.href = '/'
    }
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
        <span>AINative</span>
      </div>
      <div className={styles.navMenuContainer}>navMenu</div>
      <div className={styles.rightAction}>rightAction</div>
    </div>
  )
}
export default Header
