import { ComponentType, SVGProps } from 'react'
import * as AntdIcons from '@ant-design/icons'
export type AntdIconName = keyof typeof AntdIcons

// 扫描svg图标文件
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

// svg图标名称类型
export type SvgIconName = (typeof svgIconNames)[number]

// 获取svg图标
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

// 获取antd图标
export const getAntdIcon = (name: AntdIconName) => AntdIcons[name]

// 校验是否为图片路径
export function isImagePath(str: string) {
  if (typeof str !== 'string' || str.trim() === '') return false;
  // 路径先去掉?t=1794474165149等参数
  str = str.replace(/(\?.*)$/, '');
  // 匹配常见图片扩展名，不区分大小写
  const imageExt = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|tiff|avif)$/i;
  // 匹配base64编码的图片
  const base64Image = /^data:image\/(png|jpg|jpeg|gif|webp|svg|bmp|ico|tiff|avif);base64,/;
  return (imageExt.test(str) || base64Image.test(str));
}
