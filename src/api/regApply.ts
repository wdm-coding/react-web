import { Post, type RequestFn } from '@/services/http.decorator'
import {
  RegApplyItem,
  RegApplyListQuery,
  RegDataItem,
  RegDataListQuery
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

  // 登记申请提交或保存草稿
  @Post('registration/firstRegistration')
  static submitOrSaveRegApplyDraft: RequestFn<any, any>

  // 删除登记申请草稿
  @Post('registration/deleteDraft')
  static deleteRegApplyDraft: RequestFn<{ dataRegistId: string }, Response<any>>

  // 撤销登记申请
  @Post('cancelData/withdrawDataRegistration')
  static cancelRegApply: RequestFn<{ dataRegistId: string }, Response<any>>

  // 获取可操作的登记数据
  @Post('registration/screeningData')
  static getScreeningData: RequestFn<any, Response<any>>

  // 获取登记数据查询列表
  @Post('registration/registrationList')
  static getRegQueryData: RequestFn<
    RegDataListQuery,
    Response<PageListResult<RegDataItem>>
  >
}
export default RegApplyApi
