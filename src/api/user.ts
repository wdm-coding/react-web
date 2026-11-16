import { Post, type RequestFn } from '@/services/http.decorator'

class UserApi {
  // 获取主体列表
  @Post('user/getInstitutionList')
  static getInsList: RequestFn<any, any>

  // 获取账号信息
  @Post('accountInfo/getAccountInfo')
  static getAccountInfo: RequestFn<any, any>

  // 获取确认单管理与登记审请菜单权限 subjectCode=91620103MA73CK0N0P - 个人账号调用
  @Post('userMenu/getMenus', { paramsAsQuery: true })
  static getMenusPermissions: RequestFn<{ subjectCode: string }, any>
}

export default UserApi
