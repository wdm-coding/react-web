// 通用响应体
export interface Response<T> {
  code: number
  data: T
  message: string
}
/** 通用数据查询分页结果 */
export interface PageListResult<T> {
  content: T[]
  totalElements: number
}
