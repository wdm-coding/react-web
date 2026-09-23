import IconComponent from '@ant-design/icons'
import { ComponentType, useMemo } from 'react'
import { getSvgIcon, getAntdIcon, type AntdIconName, SvgIconName } from './icon'
interface IconProps {
  name: SvgIconName | AntdIconName
  rotate?: number
  spin?: boolean
  style?: React.CSSProperties
}
const Icon: React.FC<IconProps> = ({ name, rotate, spin = false, style }) => {
  const componentNode = useMemo(() => {
    if (name.startsWith('svg-')) {
      return getSvgIcon(name as SvgIconName)
    } else {
      return getAntdIcon(name as AntdIconName)
    }
  }, [name])
  return (
    <IconComponent
      component={componentNode as ComponentType<any>}
      spin={spin}
      rotate={rotate}
      style={style}
    />
  )
}
export default Icon
