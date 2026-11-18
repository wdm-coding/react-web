import { Post, type RequestFn } from '@/services/http.decorator'

/** 系统配置项 */
export interface SystemConfigItem {
  systemConfigId: string // 配置id
  keyName: string // 配置键名
  value: string // 配置值
  mark: string // 配置标识
}

/** 系统配置分页数据 */
export interface SystemConfigPageData {
  content: SystemConfigItem[]
  totalElements: string
  pageSize: string
  totalPages: number
}

class SystemApi {
  // 分页获取系统配置
  @Post('/systemConfig/page')
  static getSystemConfig: RequestFn<
    { pageSize: number },
    { code: number; data: SystemConfigPageData; msg: string }
  >
}

export default SystemApi
