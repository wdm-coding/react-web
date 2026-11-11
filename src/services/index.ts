import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { BaseResponse, RequestOpt } from './types'
import { getToken, setToken, clearToken } from '@/utils/storage'
import UserApi from '@/api/auth'

// 定义控制变量
let isRefreshing = false // 是否正在刷新 Token
let retryRequestQueue = [] // 等待重试的请求队列

// 创建实例
const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig & RequestOpt) => {
    // 不忽略token则自动携带
    if (!config.ignoreToken) {
      const token = getToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    // 自定义请求头
    if (config.contentType) {
      config.headers['Content-Type'] = config.contentType
    }
    return config
  }
)

// 响应拦截
http.interceptors.response.use(
  async (res: AxiosResponse<BaseResponse>): Promise<any> => {
    const resData = res.data
    console.log('success', res)
    if (resData.return_code === 20000) {
      return {
        code: 20000,
        data: resData.data,
        msg: resData.return_subMsg,
      }
    }else{
      window.$message.error(resData.return_subMsg || '系统异常')
      throw {
        code: resData.return_code,
        data: resData.data,
        msg: resData.return_subMsg,
      }
    }
    // if (resData.return_code === 50000) {
    //   return Promise.reject(resData.return_msg || '系统异常')
    // }
    // if (resData.return_code === 4001) {
    //   // token过期 ，需要刷新token
    //   const originalRequest = res.config
    //   if (originalRequest.url !== '/auth/refresh') {
    //     // 如果当前没有在刷新 Token，则开始刷新流程
    //     if (!isRefreshing) {
    //       isRefreshing = true
    //       try {
    //         const { code, data } = {
    //           code: 0,
    //           data: 'refresh'
    //         }
    //         if (code === 0) {
    //           setToken(data)
    //           retryRequestQueue.forEach((cb) => cb(data)) // 执行队列中的回调
    //           retryRequestQueue = [] // 清空队列
    //           // 重试当前失败的请求
    //           originalRequest.headers.Authorization = `Bearer ${data}`
    //           return http(originalRequest)
    //         }
    //       } catch (error) {
    //         return Promise.reject(error)
    //       } finally {
    //         isRefreshing = false
    //       }
    //     } else {
    //       return new Promise((resolve) => {
    //         // 存入回调，刷新成功后执行
    //         retryRequestQueue.push((token: string) => {
    //           originalRequest.headers.Authorization = `Bearer ${token}`
    //           resolve(http(originalRequest))
    //         })
    //       })
    //     }
    //   }
    // }
  },
  async (err) => {
    console.log('error', err.response)
    const status = err.response?.status
    let errorMsg = ''
    switch (status) {
      case 400:
        errorMsg = '请求参数错误'
        break
      case 401:
        const response = err.response
        const { message } = response.data
        errorMsg = message || 'token过期'
        // 清除token
        clearToken()
        window.location.href = '/login'
        // 需要重新登录
        break
      case 403:
        errorMsg = '无访问权限'
        break
      case 404:
        errorMsg = '路径不存在'
        break
      case 500:
        errorMsg = '服务器异常'
        break
      default:
        errorMsg = '网络异常'
        break
    }
    window.$message.error(errorMsg)
    return Promise.reject(err)
  }
)

export default http
