import { Post, type RequestFn } from '@/services/http.decorator'
import type { PortalApiResponse } from './common'

/** 资源查询列表项 */
export interface ResourceItem {
  /** 数据登记编码 */
  dataRegistId: string
  dataRegistName: string
  /** 登记数据类型：1 公共数据资源，2 公共数据产品和服务 */
  dataRegistType: string
  institutionName: string
  /** 数据内容简介 */
  dataContentIntroduction?: string
}

export interface ResourceListQuery {
  pageNum: number
  pageSize: number
  /** 登记数据类型，null 表示全部 */
  dataRegistType: string | null
  /** 行业 id，null 表示全部 */
  industry: string | null
  /** 登记地区，格式 ["620000","<地区code>"]，null 表示全部 */
  coverageArea: string | null
  /** 登记数据名称或登记主体名称，默认空字符串 */
  dataOrinstitutionName: string
}

export interface ResourcePageResult {
  content: ResourceItem[]
  totalElements: number | string
}

/** 资源详情 */
export interface ResourceDetail {
  dataRegistName: string
  institutionName: string
  /** 行业分类 */
  industry?: string[]
  /** 登记数据类型：1 公共数据资源，2 公共数据产品和服务 */
  dataRegistType: string
  /** 公示开始时间 */
  startDate?: string
  /** 公示结束时间 */
  endDate?: string
  /** 公示状态 */
  publicityStatus?: string
  /** 资源覆盖地区 */
  areas?: string[]
  /** 登记平台 */
  platformName?: string
  /** 登记机构 */
  organizationName?: string
  /** 数据内容简介 */
  dataContentIntroduction?: string
}

export interface ResourceDetailQuery {
  dataRegistId: string
}

class RegQueryApi {
  // 资源查询列表
  @Post('unifiedPortal/dataList')
  static getResourceList: RequestFn<
    ResourceListQuery,
    PortalApiResponse<ResourcePageResult>
  >

  // 资源详情
  @Post('unifiedPortal/dataDetails')
  static getResourceDetail: RequestFn<
    ResourceDetailQuery,
    PortalApiResponse<ResourceDetail>
  >
}

export default RegQueryApi
