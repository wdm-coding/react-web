import styles from './index.module.scss'
import RegisterPublic from './modules/RegisterPublic'
import { registerPublicDataSource } from './db/registerPublic'
import RegisterData from './modules/RegisterData'
const RegisterHome = () => {
  return (
    <div className={styles.registerHomeWrapper}>
      {/* 登记公示 */}
      <RegisterPublic dataSource={registerPublicDataSource} />
      {/* 登记数据一览 */}
      <RegisterData dataSource={registerPublicDataSource} />
    </div>
  )
}
export default RegisterHome
