/** 请求方法类型 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
/** 接口统一返回格式 */
export interface BaseResponse<T = any> {
  return_code: number
  data: T
  return_msg: string
  return_subMsg: string
}
/** 请求自定义配置 */
type ContentType =
  | 'application/json'
  | 'multipart/form-data'
  | 'application/x-www-form-urlencoded'
export interface RequestOpt {
  timeout?: number
  ignoreToken?: boolean // 忽略携带token
  showLoading?: boolean // 开启loading
  contentType?: ContentType // 自定义请求头Content-Type
  responseType?: 'blob' | 'json' | 'text' // 自定义响应类型
}
