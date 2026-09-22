import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
  memo
} from 'react'
import styles from './index.module.scss'

interface HorizontalVirtualLoopProps<T> {
  /** 数据源 */
  items: T[]
  /** 单项固定宽度（px） */
  itemWidth: number
  /** 项间距（px） */
  itemGap?: number
  /** 滚动速度（px/s） */
  speed?: number
  /** 鼠标悬停是否暂停滚动 */
  pauseOnHover?: boolean
  /** 可视区右侧额外缓冲项数 */
  overscan?: number
  /** 容器固定宽度，不传则撑满父级 */
  width?: number | string
  /** 容器高度，必须可确定高度（传值或外部样式指定） */
  height?: number | string
  className?: string
  renderItem: (item: T, index: number) => ReactNode
}

const LoopItem = memo(function LoopItem<T>({
  item,
  index,
  style,
  renderItem
}: {
  item: T
  index: number
  style: CSSProperties
  renderItem: (item: T, index: number) => ReactNode
}) {
  return (
    <div className={styles.loopItem} style={style}>
      {renderItem(item, index)}
    </div>
  )
})

const HorizontalVirtualLoop = <T,>({
  items,
  itemWidth,
  itemGap = 20,
  speed = 55,
  pauseOnHover = true,
  overscan = 1,
  width,
  height,
  className,
  renderItem
}: HorizontalVirtualLoopProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const hoverRef = useRef(false)
  const startIndexRef = useRef(0)
  const lastUpdateRef = useRef(0)
  const [startIndex, setStartIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)

  // 拖拽相关状态
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const count = items.length
  const slotWidth = itemWidth + itemGap
  const cycleWidth = count * slotWidth
  const scrollable = count > 0 && cycleWidth - itemGap > viewportWidth

  // 测量容器宽度
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setViewportWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // rAF 驱动滚动
  useEffect(() => {
    const track = trackRef.current
    if (!track || count === 0 || viewportWidth === 0) return
    if (!scrollable) {
      track.style.transform = ''
      track.style.willChange = 'auto'
      return
    }

    // 提升为独立合成层，transform 由 GPU 合成器线程处理
    track.style.willChange = 'transform'

    offsetRef.current = 0
    startIndexRef.current = 0
    lastUpdateRef.current = 0
    setStartIndex(0)

    let rafId = 0
    let lastTime = performance.now()

    const step = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      if (!hoverRef.current) {
        let offset = offsetRef.current + speed * delta
        if (offset >= cycleWidth) offset -= cycleWidth
        offsetRef.current = offset
        track.style.transform = `translate3d(-${offset}px, 0, 0)`

        const idx = Math.floor(offset / slotWidth)
        if (idx !== startIndexRef.current) {
          startIndexRef.current = idx
          // 节流更新渲染窗口，避免每跨越一个 item 就触发 React 重渲染
          const nowMs = performance.now()
          if (nowMs - lastUpdateRef.current > 50) {
            lastUpdateRef.current = nowMs
            setStartIndex(idx)
          }
        }
      }

      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(rafId)
      track.style.willChange = 'auto'
    }
  }, [count, scrollable, cycleWidth, slotWidth, speed, viewportWidth])

  // 拖拽处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollable) return
    if (e.button !== 0) return

    isDraggingRef.current = true
    setIsDragging(true)
    hoverRef.current = true

    dragStartXRef.current = e.clientX
    dragStartOffsetRef.current = offsetRef.current

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeaveWindow)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - dragStartXRef.current
    let nextOffset = dragStartOffsetRef.current - dx

    if (cycleWidth > 0) {
      nextOffset = nextOffset % cycleWidth
      if (nextOffset < 0) nextOffset += cycleWidth
    }

    offsetRef.current = nextOffset

    const track = trackRef.current
    if (track) {
      track.style.transform = `translate3d(-${nextOffset}px, 0, 0)`
    }

    const idx = Math.floor(nextOffset / slotWidth)
    if (idx !== startIndexRef.current) {
      startIndexRef.current = idx
      const now = performance.now()
      if (now - lastUpdateRef.current > 50) {
        lastUpdateRef.current = now
        setStartIndex(idx)
      }
    }
  }

  const stopDrag = () => {
    if (!isDraggingRef.current) return

    isDraggingRef.current = false
    setIsDragging(false)
    hoverRef.current = false

    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('mouseleave', handleMouseLeaveWindow)
  }

  const handleMouseUp = () => {
    stopDrag()
  }

  const handleMouseLeaveWindow = () => {
    stopDrag()
  }

  const renderCount = scrollable
    ? Math.ceil(viewportWidth / slotWidth) + 1 + overscan
    : count

  const containerStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    userSelect: isDragging ? 'none' : undefined,
    cursor: scrollable ? (isDragging ? 'grabbing' : 'grab') : undefined
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.horizontalVirtualLoop}${className ? ` ${className}` : ''}`}
      style={containerStyle}
      onMouseEnter={() => {
        if (!pauseOnHover) return
        if (!isDraggingRef.current) {
          hoverRef.current = true
        }
      }}
      onMouseLeave={() => {
        if (!pauseOnHover) return
        if (!isDraggingRef.current) {
          hoverRef.current = false
        }
      }}
      onMouseDown={handleMouseDown}
    >
      <div ref={trackRef} className={styles.loopTrack}>
        {Array.from({ length: renderCount }, (_, k) => {
          const position = scrollable ? startIndex + k : k
          const dataIndex = position % count
          return (
            <LoopItem
              key={position}
              item={items[dataIndex]}
              index={dataIndex}
              renderItem={renderItem}
              style={{ left: position * slotWidth, width: itemWidth }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HorizontalVirtualLoop
