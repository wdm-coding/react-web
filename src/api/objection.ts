import { Post, type RequestFn } from '@/services/http.decorator'
import type { Response, PageListResult } from '@/api/types/common'
import type { ObjectionListQuery, ObjectionItem } from '@/api/types/objection'

class ObjectionApi {
  // 获取异议申诉管理列表
  @Post('objectionApplyFor/list')
  static getObjectionList: RequestFn<
    ObjectionListQuery,
    Response<PageListResult<ObjectionItem>>
  >
}

export default ObjectionApi
