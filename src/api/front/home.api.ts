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

export interface PublicityQuery {
  pageNum: number
  pageSize: number
  sortDirection: string
  sortField: string
}

export interface PublicityItem {
  dataRegistName: string
  dataRegistType: string
  institutionName: string
  startDate: string
  endDate: string
  dataContentIntroduction: string
  serialNumber: string
  publicityStatus: string
  dataRegistId: string
  publicityInfoId: string
  canObjectionApply: boolean
}

export interface PageResult<T> {
  content: T[]
  total?: number
}

export interface PolicyQuery {
  pageNum: number
  pageSize: number
  policyStatus: number
}

export interface PolicyItem {
  policyId: string
  title: string
  content: string
  source: string
  policyStatus: number
  sorting: number
  publishTime: string
  classificationName: string
  classificationId: string
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

  // 首页登记公示列表
  @Post('publicInfo/list')
  static getPublicityList: RequestFn<
    PublicityQuery,
    HomeApiResponse<PageResult<PublicityItem>>
  >

  // 首页登记政策列表
  @Post('unifiedPortal/policyList')
  static getPolicyList: RequestFn<
    PolicyQuery,
    HomeApiResponse<PageResult<PolicyItem>>
  >
}

export default HomeApi
