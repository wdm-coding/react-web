import IconComponent from '@ant-design/icons'
import { ComponentType, useMemo } from 'react'
import {
  getSvgIcon,
  getAntdIcon,
  type AntdIconName,
  SvgIconName,
  isImagePath
} from './icon'
interface IconProps {
  name: SvgIconName | AntdIconName
  rotate?: number
  spin?: boolean
  size?: number | string
  color?: string
  width?: number | string
  height?: number | string
  label?: string
  labelColor?: string
  labelSize?: number | string
  labelPos?: 'top' | 'bottom' | 'left' | 'right'
  gap?: number | string
}
const Icon: React.FC<IconProps> = ({
  name,
  rotate,
  spin = false,
  size,
  color,
  width = size,
  height = size,
  label,
  labelColor,
  labelSize,
  labelPos = 'right',
  gap = 5
}) => {
  const componentNode = useMemo(() => {
    if (name.startsWith('svg-')) {
      return getSvgIcon(name as SvgIconName)
    }
    if (isImagePath(name)) {
      return 'img'
    }
    return getAntdIcon(name as AntdIconName)
  }, [name])

  const wrapperStyle: React.CSSProperties = useMemo(()=>{
    switch (labelPos) {
      case 'top':
        return {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: gap
        }
      case 'bottom':
        return {
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          gap: gap
        }
      case 'left':
        return {
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          gap: gap
        }
      case 'right':
        return {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: gap,
        }
      default:
        return {}
    }
  },[labelPos, gap])
  return (
    <>
      {label ? (
        <div style={wrapperStyle}>
          <span style={{fontSize: labelSize, color: labelColor}}>{label}</span>
          {componentNode === 'img' ? (
            <img
              src={name}
              alt={name}
              style={{
                width,
                height
              }}
            />
          ) : (
            <IconComponent
              component={componentNode as ComponentType<any>}
              spin={spin}
              rotate={rotate}
              style={{
                fontSize: size,
                color: color
              }}
            />
          )}
        </div>
      ) : (
        <>
          {componentNode === 'img' ? (
            <img
              src={name}
              alt={name}
              style={{
                width,
                height
              }}
            />
          ) : (
            <IconComponent
              component={componentNode as ComponentType<any>}
              spin={spin}
              rotate={rotate}
              style={{
                fontSize: size,
                color: color,
              }}
              height={height}
              width={width}
            />
          )}
        </>
      )}
    </>
  )
}
export default Icon
