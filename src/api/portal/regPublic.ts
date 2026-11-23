import { Post, type RequestFn } from '@/services/http.decorator'
import type { PortalApiResponse } from './common'

export interface RegPublicItem {
  publicityInfoId: string
  dataRegistName: string
  dataRegistType: string
  institutionName: string
  canObjectionApply: boolean
  publicityStatus?: string
  serialNumber?: string
  /** 数据登记编码 */
  dataRegistId?: string
  /** 公示开始日期 */
  startDate?: string
  /** 公示结束日期 */
  endDate?: string
  /** 数据内容简介（首页公示卡片展示） */
  dataContentIntroduction?: string
}

export interface RegPublicListQuery {
  pageNum: number
  pageSize: number
  sortDirection: string
  sortField: string
  /** 登记数据名称或登记主体名称，默认空字符串 */
  dataRegistName?: string
  /** 登记数据类型，null 表示全部 */
  dataRegistType?: string | null
  /** 登记地区，格式 ["620000","<地区code>"]，null 表示全部 */
  coverageArea?: string | null
  /** 行业 id，null 表示全部 */
  industry?: string | null
}

export interface RegPublicPageResult {
  content: RegPublicItem[]
  totalElements: number | string
}

/** 登记公示详情 */
export interface PublicityDetail {
  publiclyInfoId: string
  dataRegistName: string
  institutionName: string
  dataRegistType: string
  startDate: string
  endDate: string
  publicityStatus: string
  platformName: string
  organizationName: string
  dataContentIntroduction: string
  canObjectionApply: boolean
  industrys?: string[]
  areas?: string[]
}

class RegPublicApi {
  // 登记公示列表
  @Post('publicInfo/list')
  static getPublicityList: RequestFn<
    RegPublicListQuery,
    PortalApiResponse<RegPublicPageResult>
  >

  // 登记公示详情
  @Post('publicInfo/details')
  static getPublicityDetail: RequestFn<
    { publiclyInfoId: string },
    PortalApiResponse<PublicityDetail>
  >
}

export default RegPublicApi
