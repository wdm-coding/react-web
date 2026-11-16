import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { BaseResponse, RequestOpt } from './types'
import {useBoundStore} from '@/store'

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
      // 处理token过期情况
      const tokenMissMsg = [
        '当前会话未登录',
        '未提供有效的Token'
      ]
      if(resData.return_code === 50001 && tokenMissMsg.includes(resData.return_subMsg)){
        const {clearCache} = useBoundStore.getState()
        clearCache()
        window.$message.error(`${resData.return_subMsg}，请重新登录`)
        return
      }
      window.$message.error(resData.return_subMsg || '系统异常')
      throw {
        code: resData.return_code,
        data: resData.data,
        msg: resData.return_subMsg,
      }
    }
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
