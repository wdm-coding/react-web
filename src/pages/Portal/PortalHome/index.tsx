import Banner from './modules/Banner'
import RegisterProcess from './modules/RegisterProcess'
import DataOverview from './modules/DataOverview'
import RegisterPublicity from './modules/RegisterPublicity'
import RegisterPolicy from './modules/RegisterPolicy'
import styles from './index.module.scss'

const PortalHome = () => {
  return (
    <div className={styles.portalHomeWrapper}>
      <Banner />
      <RegisterProcess />
      <DataOverview />
      <RegisterPublicity />
      <RegisterPolicy />
    </div>
  )
}

export default PortalHome
