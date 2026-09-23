import 'reflect-metadata'
import httpService from './index'
import { AxiosRequestConfig } from 'axios'
import { HttpMethod, RequestOpt } from './types'
export interface RequestFn<T = any, R = any> {
  (params?: T): Promise<R>
}

// 元数据唯一标识
const HTTP_META_KEY = Symbol('http_meta')

// 存储接口元数据结构
interface HttpMeta {
  url: string // 接口路径
  method: HttpMethod // 请求方法
  options?: RequestOpt // 请求自定义配置
}

// 构建请求函数（方法形式 / 属性形式共用）
function createRequestFn<T, R>(
  target: any,
  propertyKey: string | symbol,
  meta: HttpMeta
): RequestFn<T, R> {
  return async function (params?: T): Promise<R> {
    // 每次调用时重新读取元数据，避免热更新/重复装饰时出现陈旧数据
    const currentMeta: HttpMeta =
      Reflect.getMetadata(HTTP_META_KEY, target, propertyKey) ?? meta

    let reqUrl = currentMeta.url
    const paramObj = (params ?? {}) as Record<string, any>

    // 处理路径参数 :xxx
    const pathParams: Record<string, string> = {}
    const regex = /:(\w+)/g
    let match: RegExpMatchArray | null = null
    while ((match = regex.exec(reqUrl)) !== null) {
      const key = match[1]
      if (paramObj[key] !== undefined) {
        pathParams[key] = String(paramObj[key])
      }
    }
    Object.keys(pathParams).forEach((k) => {
      reqUrl = reqUrl.replace(`:${k}`, pathParams[k])
    })

    // 剩余参数作为查询参数 / 请求体
    const queryParams: Record<string, any> = {}
    Object.keys(paramObj).forEach((k) => {
      if (!pathParams[k]) queryParams[k] = paramObj[k]
    })

    // 构建请求配置
    const config: AxiosRequestConfig & RequestOpt = {
      url: reqUrl,
      method: currentMeta.method.toLowerCase(),
      ...currentMeta.options
    }
    const hasParams = Object.keys(paramObj).length > 0
    if (hasParams) {
      if (config.method?.toUpperCase() === 'GET') {
        config.params = queryParams
      } else {
        config.data = queryParams
      }
    }

    // 发送请求
    return httpService(config) as Promise<R>
  }
}

// 通用HTTP请求装饰器（同时支持静态方法 与 静态属性声明）
function Http(method: HttpMethod, url: string, opt?: RequestOpt) {
  const meta: HttpMeta = { method, url, options: opt }

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor?: PropertyDescriptor
  ) {
    // 写入元数据（静态成员 target 为构造函数）
    Reflect.defineMetadata(HTTP_META_KEY, meta, target, propertyKey)

    const requestFn = createRequestFn(target, propertyKey, meta)

    if (descriptor) {
      // 方法形式：@Post('/xxx') static async foo() {}
      descriptor.value = requestFn
    } else {
      // 属性形式：@Post('/xxx') static foo: RequestFn<T, R>
      // 属性装饰器没有 descriptor，需要主动在类上定义属性
      Object.defineProperty(target, propertyKey, {
        value: requestFn,
        writable: true,
        configurable: true,
        enumerable: true
      })
    }
  }
}
// 快捷简写装饰器
export const Get = (url: string, opt?: RequestOpt) => Http('GET', url, opt)
export const Post = (url: string, opt?: RequestOpt) => Http('POST', url, opt)
export const Put = (url: string, opt?: RequestOpt) => Http('PUT', url, opt)
export const Delete = (url: string, opt?: RequestOpt) =>
  Http('DELETE', url, opt)
export const Patch = (url: string, opt?: RequestOpt) => Http('PATCH', url, opt)
