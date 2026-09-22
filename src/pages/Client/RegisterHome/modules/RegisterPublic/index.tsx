import { useMemo } from 'react'
import styles from './index.module.scss'
import Marquee from '../../components/Marquee'
interface RegisterPublicItem {
  dataRegistName: string
  dataRegistType: string
  institutionName: string
  endDate: string
  serialNumber: string
  startDate: string
  dataContentIntroduction: string
  publicityStatus: string
  dataRegistId: string
  publicityInfoId: string
  canObjectionApply: boolean
}

const RegisterPublic: React.FC<{ dataSource: RegisterPublicItem[] }> = ({
  dataSource
}) => {
  const list = useMemo(() => {
    const items =
      dataSource.length > 3 ? [...dataSource, ...dataSource] : dataSource
    return items.map((item, index) => ({
      ...item,
      dataRegistIndex: `${item.dataRegistId}-${index}`
    }))
  }, [dataSource.length])

  return (
    <div className={styles.registerPublicWrapper}>
      <div className={styles.registerPublicTitle}>登记公示</div>
      <div className={styles.registerPublicDesc}>公示期为10个工作日</div>
      <div className={styles.registerPublicList}>
        <Marquee list={list}>
          {list.map((item) => (
            <div
              key={item.dataRegistIndex}
              className={styles.registerPublicItem}
            >
              {item.dataRegistName}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
export default RegisterPublic
