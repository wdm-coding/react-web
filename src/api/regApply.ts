import { Post, type RequestFn } from '@/services/http.decorator'
import { RegApplyListQuery, RegApplyListResult } from '@/api/types/regApply'

export interface RegApplyResponse<T> {
  code: number
  data: T
  msg: string
}

class RegApplyApi {
  // 获取登记申请列表
  @Post('registrationApplyFor/list')
  static getRegApplyList: RequestFn<
    RegApplyListQuery,
    RegApplyResponse<RegApplyListResult>
  >
  // 登记申请详情
  @Post('registrationApplyFor/details')
  static getRegApplyDetail: RequestFn<
    { dataRegistId: string },
    RegApplyResponse<any>
  >
  // 登记申请提交或保存草稿
  @Post('registration/firstRegistration')
  static submitOrSaveRegApplyDraft: RequestFn<any, any>
}
export default RegApplyApi
