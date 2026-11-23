import { useCallback, useState } from 'react'

// 表体纵向滚动配置：仅数据超出可视高度时启用（固定表头+纵向滚动条）
const BODY_OFFSET = 480
const ROW_HEIGHT = 39
const SCROLL_Y = `max(240px, calc(100vh - ${BODY_OFFSET}px))`

/**
 * 表格滚动配置：横向固定滚动宽度，纵向仅在当前页数据超出可视高度时启用，
 * 避免数据未超出时展示纵向滚动条槽
 */
const useTableScroll = (scrollX = 1200) => {
  const [scrollY, setScrollY] = useState<string>()
  // 列表请求完成后调用，按行数判断是否启用纵向滚动
  const updateScrollY = useCallback((rowCount: number) => {
    setScrollY(
      rowCount * ROW_HEIGHT > window.innerHeight - BODY_OFFSET
        ? SCROLL_Y
        : undefined
    )
  }, [])
  const scroll = { x: scrollX, ...(scrollY ? { y: scrollY } : {}) }
  return { scroll, updateScrollY }
}
export default useTableScroll
