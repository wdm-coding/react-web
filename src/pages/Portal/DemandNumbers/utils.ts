/** 用数单位名称脱敏：保留首字，其余替换为 * */
export const maskUnitName = (name?: string) => {
  if (typeof name !== 'string' || name.length === 0) return ''
  if (name.length === 1) return name
  return `${name[0]}${'*'.repeat(name.length - 1)}`
}

const DATA_TYPE_LABELS: Record<string, string> = {
  '1': '公共数据资源',
  '2': '公共数据产品和服务'
}

/** 数据类型文案，未匹配时按开放数据资源展示 */
export const getDataTypeLabel = (dataType?: string) =>
  DATA_TYPE_LABELS[dataType ?? ''] ?? '开放数据资源'

const pad = (value: number) => String(value).padStart(2, '0')

/** 格式化日期为 YYYY-MM-DD HH:mm:ss */
export const formatDateTime = (value?: string) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
