import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Tooltip } from 'antd'
import styles from './index.module.scss'

interface EllipsisTextProps {
  text?: ReactNode
  line?: number
  className?: string
  style?: React.CSSProperties
}

const EllipsisText = ({ text, line = 1, className, style }: EllipsisTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isEllipsis, setIsEllipsis] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setIsEllipsis(el.scrollHeight > el.clientHeight)
  }, [text, line])

  const content = (
    <div
      className={`${styles.ellipsisText} ${className ?? ''}`}
      ref={containerRef}
      style={{ WebkitLineClamp: line, ...style }}
    >
      {text}
    </div>
  )

  if (!isEllipsis) return content

  return <Tooltip title={text}>{content}</Tooltip>
}

export default EllipsisText
