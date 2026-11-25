import { Post, type RequestFn } from '@/services/http.decorator'
import type {
  ApprovaListQuery,
  ApprovaListItem,
  JoinListItem,
  JoinListQuery
} from '@/api/types/approvalManage'
import { Response, PageListResult } from '@/api/types/common'
class ApprovalManageApi {
  // 审批待办-我的待办-登记审批列表
  @Post('registrationApplyFor/examineList')
  static getExamineList: RequestFn<
    ApprovaListQuery,
    Response<PageListResult<ApprovaListItem>>
  >
  // 审批待办-我的待办-申请加入处理
  @Post('waitToBeDone/bodyExamineList')
  static getJoinTodoList: RequestFn<
    JoinListQuery,
    Response<PageListResult<JoinListItem>>
  >

  // 审批待办-我的已办-登记审批列表
  @Post('registrationApplyFor/completedList')
  static getCompletedList: RequestFn<
    ApprovaListQuery,
    Response<PageListResult<ApprovaListItem>>
  >
  // 审批待办-我的已办-申请加入处理
  @Post('user/completedList')
  static getJoinCompletedList: RequestFn<
    JoinListQuery,
    Response<PageListResult<JoinListItem>>
  >
}

export default ApprovalManageApi
