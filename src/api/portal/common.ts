import { Post, type RequestFn } from '@/services/http.decorator'

/** 甘肃省区域编码 */
export const GANSU_AREA_CODE = '620000'

export interface PortalAreaItem {
  name: string
  code: string
  children?: PortalAreaItem[]
}

export interface PortalIndustryItem {
  industryId: string
  name: string
  /** 行业公示数量（登记公示筛选项） */
  publicityCount?: number | string
  /** 行业资源数量（资源查询筛选项） */
  successCount?: number | string
}

export interface PortalApiResponse<T> {
  code: number
  data: T
  msg: string
}

class PortalCommonApi {
  // 登记地区（甘肃省及下辖地区）
  @Post('common/portal/area')
  static getPortalAreaList: RequestFn<
    undefined,
    PortalApiResponse<PortalAreaItem[]>
  >

  // 行业列表
  @Post('common/industryList')
  static getIndustryList: RequestFn<
    undefined,
    PortalApiResponse<PortalIndustryItem[]>
  >
}

export default PortalCommonApi
