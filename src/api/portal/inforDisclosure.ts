import { Get, type RequestFn } from '@/services/http.decorator'
import type { PortalApiResponse } from './common'

/** 披露机构类型：1-实施机构，2-运营机构 */
export type DisclosureType = 1 | 2

/** 信息披露机构列表项 */
export interface DisclosureItem {
  id: string
  /** 机构名称 */
  disclosureName: string
  /** 联系地址 */
  address?: string
  /** 邮箱 */
  email?: string
}

export interface DisclosureListQuery {
  pageNum: number
  pageSize: number
  type: DisclosureType
  /** 机构名称，不传表示全部 */
  disclosureName?: string
}

export interface DisclosurePageResult {
  content: DisclosureItem[]
  totalElements: number | string
  pageSize?: number | string
  totalPages?: number
}

/** 详情中的公共数据资源 */
export interface DisclosureDetailItem {
  id: string
  /** 资源 / 产品和服务名称 */
  resourceName?: string
  /** 登记状态：1-已登记，0-拟登记 */
  registerStatus?: string | number
  /** 授权运营方式 / 产品和服务方式 */
  grantType?: string
  /** 收费标准 */
  pricing?: string
  /** 应用场景 */
  scene?: string
  /** 被授权机构明细 */
  basicPublicList?: DisclosureBasicPublicItem[]
}

export interface DisclosureBasicPublicItem {
  /** 运营机构 / 实施机构名称 */
  institutionName?: string
  /** 已授权的公共数据资源名称 */
  dataRegistName?: string
  /** 机构登记状态：1-已登记，0-拟登记 */
  registerStatus?: string | number
  /** 授权运营期限 */
  term?: string
  /** 信息披露时间 */
  year?: string | number
}

export interface DisclosureDetailQuery {
  id: string
  pageNum: number
  pageSize: number
  type: DisclosureType
}

export interface DisclosureDetailPageResult {
  content: DisclosureDetailItem[]
  totalElements: number | string
  pageSize?: number | string
  totalPages?: number
}

class InforDisclosureApi {
  // 信息披露机构列表
  @Get('disclosure/portal/list')
  static getDisclosureList: RequestFn<
    DisclosureListQuery,
    PortalApiResponse<DisclosurePageResult>
  >

  // 信息披露机构详情
  @Get('disclosure/portal/detail')
  static getDisclosureDetail: RequestFn<
    DisclosureDetailQuery,
    PortalApiResponse<DisclosureDetailPageResult>
  >
}

export default InforDisclosureApi
