import { Post, type RequestFn } from '@/services/http.decorator'
import type { PortalApiResponse } from './common'

/** 登记机构列表项 */
export interface InstitutionItem {
  /** 机构 id */
  organizationId: string
  /** 机构名称 */
  organizationName: string
  /** 联系电话 */
  phone?: string
  /** 联系地址 */
  address?: string
  /** 登记范围，JSON 数组字符串，如 ["甘肃省","兰州市"] */
  area?: string
  /** 登记范围地区编码，JSON 数组字符串 */
  areaCode?: string
  /** 机构简介 */
  organizationDesc?: string
  /** 上级机构 id */
  parentOrganizationId?: string
}

export interface InstitutionListQuery {
  pageNum: number
  pageSize: number
  sortField: string
  sortDirection: string
  /** 登记机构名称，空字符串表示全部 */
  organizationName: string
}

export interface InstitutionPageResult {
  content: InstitutionItem[]
  totalElements: number | string
  pageSize?: number | string
  totalPages?: number
}

class RegInstitutionApi {
  // 登记机构列表
  @Post('unifiedPortal/organizationList')
  static getOrganizationList: RequestFn<
    InstitutionListQuery,
    PortalApiResponse<InstitutionPageResult>
  >
}

export default RegInstitutionApi
