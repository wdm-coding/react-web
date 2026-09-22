import styles from './index.module.scss'
import RegisterPublic from './modules/RegisterPublic'
import { registerPublicDataSource } from './db/registerPublic'
const RegisterHome = () => {
  return (
    <div className={styles.registerHomeWrapper}>
      {/* 登记公示 */}
      <RegisterPublic dataSource={registerPublicDataSource} />
    </div>
  )
}
export default RegisterHome
