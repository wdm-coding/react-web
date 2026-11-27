import { Post, type RequestFn } from '@/services/http.decorator'
import {
  RegApplyItem,
  RegApplyListQuery,
  RegDataItem,
  RegDataListQuery,
  RegScreeningQuery
} from '@/api/types/regApply'
import { Response, PageListResult } from '@/api/types/common'

class RegApplyApi {
  // 获取登记申请列表
  @Post('registrationApplyFor/list')
  static getRegApplyList: RequestFn<
    RegApplyListQuery,
    Response<PageListResult<RegApplyItem>>
  >

  // 登记申请详情
  @Post('registrationApplyFor/details')
  static getRegApplyDetail: RequestFn<{ dataRegistId: string }, Response<any>>

  // 首次登记申请提交或保存草稿
  @Post('registration/firstRegistration')
  static firstRegApplySubmit: RequestFn<any, any>

  // 删除登记申请草稿
  @Post('registration/deleteDraft')
  static deleteRegApplyDraft: RequestFn<{ dataRegistId: string }, Response<any>>

  // 撤销登记申请
  @Post('cancelData/withdrawDataRegistration')
  static cancelRegApply: RequestFn<{ dataRegistId: string }, Response<any>>

  // 获取可操作的登记数据
  @Post('registration/screeningData')
  static getScreeningData: RequestFn<RegScreeningQuery, Response<any>>

  // 变更提交登记申请
  @Post('changeData/changeDataRegistration')
  static changeRegApply: RequestFn<any, any>

  // 撤销变更提交登记申请
  @Post('changeData/cancelChange')
  static cancelChangeRegApply: RequestFn<
    { dataRegistId: string },
    Response<any>
  >

  // 更正登记申请
  @Post('correctionData/correctionDataRegistration')
  static correctRegApply: RequestFn<any, any>

  // 撤销更正登记申请
  @Post('correctionData/cancelCorrection')
  static cancelRegApplyCorrect: RequestFn<
    { dataRegistId: string },
    Response<any>
  >

  // 注销登记申请
  @Post('cancelData/cancelDataRegistration')
  static logoutRegApply: RequestFn<any, any>

  // 续展登记申请
  @Post('continue/addContinue')
  static continueRegApply: RequestFn<any, any>

  // 获取登记数据查询列表
  @Post('registration/registrationList')
  static getRegQueryData: RequestFn<
    RegDataListQuery,
    Response<PageListResult<RegDataItem>>
  >
}
export default RegApplyApi
