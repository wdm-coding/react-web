/** 请求方法类型 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
/** 接口统一返回格式 */
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}
/** 请求自定义配置 */
export interface RequestOpt {
  timeout?: number;
  ignoreToken?: boolean; // 忽略携带token
  showLoading?: boolean; // 开启loading
  contentType?: 'application/json' | 'multipart/form-data' | 'application/x-www-form-urlencoded'; // 自定义请求头Content-Type
  responseType?: 'blob' | 'json' | 'text'; // 自定义响应类型
}
