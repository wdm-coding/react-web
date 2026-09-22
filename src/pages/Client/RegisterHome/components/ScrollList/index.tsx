import { ReactNode, Children } from 'react'
import styles from './index.module.scss'

interface MarqueeProps {
  children: ReactNode
  pauseOnHover?: boolean
  speed?: number // 这里的 speed 可以映射为 CSS 动画的 duration
}

const ScrollList: React.FC<MarqueeProps> = ({
  children,
  pauseOnHover = true,
  speed = 55
}) => {
  // 将 children 转换为数组，并在内部复制一份，父组件无需再处理数据
  const childArray = Children.toArray(children)
  const duplicatedChildren = [...childArray, ...childArray]

  // 动态计算动画时长，保证不同宽度下速度一致
  const animationStyle = {
    '--marquee-duration': `${speed}s`,
    animationPlayState: 'running'
  } as React.CSSProperties

  return (
    <div
      className={styles.marqueeWrapper}
      onMouseEnter={() =>
        pauseOnHover &&
        (
          document.querySelector(`.${styles.marqueeTrack}`) as HTMLElement
        )?.style.setProperty('animation-play-state', 'paused')
      }
      onMouseLeave={() =>
        pauseOnHover &&
        (
          document.querySelector(`.${styles.marqueeTrack}`) as HTMLElement
        )?.style.setProperty('animation-play-state', 'running')
      }
    >
      <div className={styles.marqueeTrack} style={animationStyle}>
        {duplicatedChildren}
      </div>
    </div>
  )
}

export default ScrollList
