import type { RequestFn } from '@/services/http.decorator'
import { Post } from '@/services/http.decorator'
import type { PortalApiResponse } from './common'

/** 用数需求列表项 */
export interface DemandNumbersItem {
  id?: string
  /** 需求编号 */
  demandNo2?: string
  /** 用数单位名称 */
  usingUnitName?: string
  /** 需求名称 */
  demandName?: string
  /** 数据类型：1-公共数据资源，2-公共数据产品和服务，其他-开放数据资源 */
  dataType?: string
  /** 行业分类 */
  industryName?: string
  /** 行业 id */
  industryId?: string
  /** 区域范围 */
  regionName?: string
  /** 需求概述 */
  demandOverview?: string
  /** 发布日期 */
  createdTime?: string
}

export interface DemandNumbersQuery {
  /** 页码（从 0 开始） */
  pageNum: number
  pageSize: number
  demandName: string
  dataType: string | null
  industryId: string | null
  isHome: '1'
}

export interface DemandNumbersPageResult {
  content: DemandNumbersItem[]
  totalElements: number | string
  pageSize?: number | string
  totalPages?: number
}

/** 行业分类 */
export interface IndustryItem {
  industryId: string
  name: string
}

class DemandNumbersApi {
  // 门户用数需求列表
  @Post('demands/pageHome')
  static getDemandNumbersList: RequestFn<
    DemandNumbersQuery,
    PortalApiResponse<DemandNumbersPageResult>
  >

  // 行业分类列表
  @Post('common/industryList')
  static getIndustryList: RequestFn<
    Record<string, never>,
    PortalApiResponse<IndustryItem[]>
  >
}

export default DemandNumbersApi
