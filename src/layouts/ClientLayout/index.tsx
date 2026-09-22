import OutletPage from '@/layouts/components/OutletPage'
import styles from './index.module.scss'
import Header from './components/Header'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { useEffect, useRef } from 'react'
const ClientLayout = () => {
  const scrollableNodeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = scrollableNodeRef.current
    if (node) {
      // 定义滚动处理函数
      const handleScroll = () => {}
      // 绑定滚动事件
      node.addEventListener('scroll', handleScroll)
      // 清理函数：组件卸载时移除监听，避免内存泄漏
      return () => {
        node.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  return (
    <div className={styles.clientLayout}>
      <Header />
      <SimpleBar
        style={{ maxHeight: 'calc(100vh - 75px)' }}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <div className={styles.contentContainer}>
          <OutletPage />
        </div>
        <div className={styles.footerContainer}>
          <div>ICP备案/许可证号：陇ICP备19000165号</div>
          <div>
            建议使用Edge浏览器 (79以上版本)，Chrome浏览器
            (73.0以上版本)，1440*900以上分辨率浏览本站
          </div>
        </div>
      </SimpleBar>
    </div>
  )
}
export default ClientLayout
