import OutletPage from '@/layouts/components/OutletPage'
import styles from './index.module.scss'
import Header from './Header/index.tsx'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
const ClientLayout = () => {
  const { pathname } = useLocation()
  const isFixed = true
  const [isScroll, setIsScroll] = useState(false)
  // 详情页没有顶部 banner，顶栏固定为白底样式，避免白色文字在浅色背景上不可见
  const isDetailPage = pathname.endsWith('Detail')
  const solidHeader = isDetailPage || isScroll
  return (
    <div className={styles.clientLayout}>
      <Header isFixed={isFixed} isScroll={solidHeader} />
      <OutletPage
        maxHeight={isFixed ? '100vh' : 'calc(100vh - 75px)'}
        // 页脚固定占 10vh，详情页内容较短时扣除页脚高度，避免出现多余的竖向滚动条
        contentStyle={
          isDetailPage ? { minHeight: 'calc(100vh - 10vh)' } : undefined
        }
        onScroll={(e) => {
          setIsScroll((e.target as HTMLElement).scrollTop > 10 ? true : false)
        }}
      >
        <div className={styles.footerContainer}>
          <div>ICP备案/许可证号：陇ICP备10000569号-12</div>
          <div>
            建议使用Edge浏览器（79以上版本），Chrome浏览器（73.0以上版本），1440*900以上分辨率浏览本站
          </div>
        </div>
      </OutletPage>
    </div>
  )
}
export default ClientLayout
