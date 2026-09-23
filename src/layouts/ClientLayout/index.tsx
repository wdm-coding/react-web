import OutletPage from '@/layouts/components/OutletPage'
import styles from './index.module.scss'
import Header from './Header/index.tsx'
import { useState } from 'react'
const ClientLayout = () => {
  const [isFixed, setIsFixed] = useState(true)
  const [isScroll, setIsScroll] = useState(false)
  return (
    <div className={styles.clientLayout}>
      <Header isFixed={isFixed} isScroll={isScroll} />
      <OutletPage
        maxHeight={isFixed ? '100vh' : 'calc(100vh - 75px)'}
        onScroll={(e) => {
          setIsScroll((e.target as HTMLElement).scrollTop > 10 ? true : false)
        }}
      >
        <div className={styles.footerContainer}>
          <div>ICP备案/许可证号：陇ICP备19000165号</div>
          <div>
            建议使用Edge浏览器 (79以上版本)，Chrome浏览器
            (73.0以上版本)，1440*900以上分辨率浏览本站
          </div>
        </div>
      </OutletPage>
    </div>
  )
}
export default ClientLayout
