import styles from './index.module.scss'
import { ReactNode, useRef, useEffect } from 'react'
interface MarqueeProps {
  children: ReactNode
  list: any[]
  pauseOnHover?: boolean
  speed?: number
  limit?: number
}
const Marquee: React.FC<MarqueeProps> = ({
  children,
  list,
  limit = 3,
  speed = 55,
  pauseOnHover = true
}) => {
  const offsetRef = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef(false)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (list.length <= limit) {
      track.style.transform = ''
      return
    }
    offsetRef.current = 0
    const halfWidth = track.scrollWidth / 2
    let rafId = 0
    let lastTime = performance.now()
    const step = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      if (!hoverRef.current) {
        offsetRef.current += speed * delta
        if (offsetRef.current >= halfWidth) {
          offsetRef.current -= halfWidth
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`
      }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [list, limit, speed])
  return (
    <div
      className={styles.marqueeWrapper}
      onMouseEnter={() => pauseOnHover && (hoverRef.current = true)}
      onMouseLeave={() => pauseOnHover && (hoverRef.current = false)}
    >
      <div ref={trackRef} className={styles.marqueeTrack}>
        {children}
      </div>
    </div>
  )
}

export default Marquee
