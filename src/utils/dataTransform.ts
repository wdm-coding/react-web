import dayjs from 'dayjs'

// 转换日期范围为数组格式
export const getDateRange = (start: string, end: string) => {
  if (!start || !end) {
    return []
  }
  return [start, end].map((item) => dayjs(item).format('YYYY-MM-DD'))
}
