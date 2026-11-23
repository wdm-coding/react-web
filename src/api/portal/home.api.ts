import { Get, Post, type RequestFn } from '@/services/http.decorator'

export interface SignInCount {
  /** 登记申请 */
  applyForCount: number
  /** 登记公示 */
  publicityCount: number
  /** 异议申诉 */
  appealCount: number
  /** 确认单发放 */
  successCount: number
}

export interface AreaRegisterStatistic {
  areaCode: string
  areaName: string
  applyCount: string
  publicityCount: string
  appealCount: string
  successCount: string
}

export interface HomeApiResponse<T> {
  code: number
  data: T
  msg: string
}

class HomeApi {
  // 首页登记数据统计
  @Post('unifiedPortal/getSignInCount')
  static getSignInCount: RequestFn<undefined, HomeApiResponse<SignInCount>>

  // 首页登记数据一览
  @Get('home/dataRegistStatistic')
  static getDataRegisterStatistic: RequestFn<
    undefined,
    HomeApiResponse<AreaRegisterStatistic[]>
  >
}

export default HomeApi
