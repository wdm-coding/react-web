import { Post, type RequestFn } from '@/services/http.decorator'
import type { Response, PageListResult } from '@/api/types/common'
import type { InsUserListQuery, InsUserItem } from '@/api/types/account'
class AccountApi {
  // 登记主体信息 - 获取主体账号信息/个人账号基本信息
  @Post('accountInfo/getAccountInfo')
  static getAccountInfo: RequestFn<any, any>
  // 机构用户管理列表
  @Post('user/list')
  static getInsUserList: RequestFn<
    InsUserListQuery,
    Response<PageListResult<InsUserItem>>
  >
  // 主体-申请邀请记录
  @Post('home/bodyUserList')
  static getBodyInviteRecord: RequestFn<any, any>
  // 个人-申请邀请记录
  @Post('home/bodyList')
  static getPersonInviteRecord: RequestFn<any, any>
}

export default AccountApi
