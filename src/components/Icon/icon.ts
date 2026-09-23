import { ComponentType, SVGProps } from 'react'
import * as AntdIcons from '@ant-design/icons'
export type AntdIconName = keyof typeof AntdIcons
const iconModules = import.meta.glob<{
  default: ComponentType<SVGProps<SVGSVGElement>>
}>('@/assets/svg/*.svg', {
  eager: true,
  query: '?react'
})
const svgIconNames = Object.keys(iconModules).map(
  (key) =>
    key
      .replace(/^\.\/|\.svg$/g, '')
      .split('/')
      .pop()!
)
export type SvgIconName = (typeof svgIconNames)[number]
export const getSvgIcon = (name: SvgIconName) => {
  const svgName = name.replace('svg-', '')
  const path = `/src/assets/svg/${svgName}.svg`
  if (!iconModules[path]) {
    console.warn(`图标${name}不存在`)
    return null
  } else {
    return iconModules[path]?.default
  }
}

export const getAntdIcon = (name: AntdIconName) => AntdIcons[name]
