import { Outlet } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { ReactNode, useEffect, useRef } from 'react'
interface OutletPageProps {
  maxHeight?: string
  contentStyle?: React.CSSProperties
  onScroll?: (e: Event) => void
  children?: ReactNode
}
const OutletPage = ({
  maxHeight = '100vh',
  contentStyle,
  children,
  onScroll
}: OutletPageProps) => {
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
  return (
    <SimpleBar
      style={{ maxHeight: maxHeight }}
      scrollableNodeProps={{ ref: scrollableNodeRef }}
    >
      <div style={{ minHeight: maxHeight, ...contentStyle }}>
        <Outlet />
      </div>
      {children}
    </SimpleBar>
  )
}
export default OutletPage
