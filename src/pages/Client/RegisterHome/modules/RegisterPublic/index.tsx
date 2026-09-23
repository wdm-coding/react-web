import styles from './index.module.scss'
import HorizontalVirtualLoop from '@/components/HorizontalVirtualLoop'
import EllipsisText from '@/components/EllipsisText'
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
  return (
    <div className={styles.registerPublicWrapper}>
      <div className={styles.registerPublicTitle}>登记公示</div>
      <div className={styles.registerPublicDesc}>公示期为10个工作日</div>
      <div className={styles.horizontalVirtualLoopContainer}>
        <HorizontalVirtualLoop
          items={dataSource}
          itemWidth={434}
          itemGap={20}
          speed={25}
          width={1342}
          height={338}
          renderItem={(item) => (
            <div className={styles.registerPublicItem}>
              <div className={styles.titleWrapper}>
                <img
                  src={
                    new URL('@/assets/images/common/logo.jpeg', import.meta.url)
                      .href
                  }
                  alt=''
                  style={{ width: 32, height: 32, marginRight: 10 }}
                />
                <EllipsisText text={item?.dataRegistName} />
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.fieldLabel}>登记类型</div>
                <div className={styles.fieldValue}>
                  {item?.dataRegistType === '1'
                    ? '公共数据资源'
                    : '公共数据产品和服务'}
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.fieldLabel}>登记主体</div>
                <div className={styles.fieldValue}>{item?.institutionName}</div>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.fieldLabel}>数据内容简介</div>
                <div className={styles.fieldValue}>
                  <EllipsisText text={item?.dataContentIntroduction} line={4} />
                </div>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.fieldLabel}>公示截止时间</div>
                <div className={styles.fieldValue}>{item?.endDate}</div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
export default RegisterPublic
