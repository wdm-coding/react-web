import { ReactNode, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Icon from '@/components/Icon';
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { useLocation } from 'react-router-dom';
interface Props {
  title: string | ReactNode,
  extra?: string | ReactNode,
  showBack?: boolean,
  children?: ReactNode,
  contentStyle?: React.CSSProperties,
  onScroll?: (e: Event) => void,
}
const pageContainer: React.FC<Props> = ({ title, extra, showBack = true, children,contentStyle, onScroll }) => { 
  const {pathname} = useLocation()
  const scrollableNodeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = scrollableNodeRef.current
    if (node) {
      // 定义滚动处理函数
      const handleScroll = (e: Event) => {
        onScroll?.(e)
      }
      // 绑定滚动事件
      node.addEventListener('scroll', handleScroll)
      // 清理函数：组件卸载时移除监听，避免内存泄漏
      return () => {
        node.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  // 切换路由时，滚动到顶部
  useEffect(() => {
    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.scrollTop = 0
    }
  }, [pathname])
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>
        <div className='flex items-center gap-2'>
          {showBack && (
            <span onClick={() => {
              window.history.back()
            }}>
              <Icon name="RollbackOutlined" size={20} color="#1471ff" />
            </span>
          )}
          <h2 className={styles.title}>{title}</h2>
        </div>
        {extra}
      </div>
      <SimpleBar 
        style={{ maxHeight: 'calc(100vh - 72px - 50px)' }}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <div style={contentStyle}>
          {children}
        </div>
      </SimpleBar>
    </div>
  )
}
export default pageContainer