import 'reflect-metadata';
import httpService from './index';
import { AxiosRequestConfig } from 'axios';
import { HttpMethod, RequestOpt } from './types';

// 元数据唯一标识
const HTTP_META_KEY = Symbol('http_meta');

// 存储接口元数据结构
interface HttpMeta {
  url: string; // 接口路径
  method: HttpMethod; // 请求方法
  options?: RequestOpt; // 请求自定义配置
}

// 通用HTTP请求装饰器
function Http(method: HttpMethod, url: string, opt?: RequestOpt) {
  // 参数1：目标类 2：方法名 3：方法描述符
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    // 存储元数据
    Reflect.defineMetadata(HTTP_META_KEY, { method, url, options: opt }, target, methodName);
    // 重写接口方法
    descriptor.value = async function (params?: Record<string, any>) {
      // 从元数据中获取接口元数据
      const meta: HttpMeta = Reflect.getMetadata(HTTP_META_KEY, target, methodName);
      let reqUrl = meta.url;
      if (!params) params = {};
      // 处理路径参数
      const regex = /:(\w+)/g;
      const pathParams: Record<string, string> = {};
      let match: RegExpMatchArray | null = null;
      while ((match = regex.exec(reqUrl)) !== null) {
        const key = match[1];
        if (params[key] !== undefined) {
          pathParams[key] = params[key];
        }
      }
      // 替换路径参数
      Object.keys(pathParams).forEach((k) => {
        reqUrl = reqUrl.replace(`:${k}`, pathParams[k]);
      });
      // 处理查询参数(剩下的当查询参数)
      const queryParams: Record<string, any> = {};
      Object.keys(params).forEach((k) => {
        if (!pathParams[k]) queryParams[k] = params[k];
      });
      // 构建请求配置
      const config: AxiosRequestConfig & RequestOpt = {
        url: reqUrl,
        method: meta.method.toLowerCase(),
        ...meta.options,
      };
      if (Object.keys(params).length > 0) {
        if (config.method.toUpperCase() === 'GET') {
          config.params = queryParams;
        } else {
          config.data = queryParams;
        }
      }
      // 发送请求
      return httpService(config);
    };
  };
}

// 快捷简写装饰器
export const Get = (url: string, opt?: RequestOpt) => Http('GET', url, opt);
export const Post = (url: string, opt?: RequestOpt) => Http('POST', url, opt);
export const Put = (url: string, opt?: RequestOpt) => Http('PUT', url, opt);
export const Delete = (url: string, opt?: RequestOpt) => Http('DELETE', url, opt);
export const Patch = (url: string, opt?: RequestOpt) => Http('PATCH', url, opt);
