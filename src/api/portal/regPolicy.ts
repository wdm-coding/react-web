import { Post, type RequestFn } from '@/services/http.decorator'
import type { PortalApiResponse } from './common'

/** 登记政策项 */
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

/** 政策分类项 */
export interface PolicyClassificationItem {
  /** 分类 id */
  classificationId: string
  /** 分类名称 */
  classificationName: string
  parentId?: string
  remark?: string
  /** 排序值 */
  sorting?: number
}

/** 政策分类查询参数 */
export interface PolicyClassificationQuery {
  pageNum: number
  pageSize: number
  sortField?: string
  sortDirection?: 'ASC' | 'DESC'
}

/** 登记政策列表查询参数 */
export interface PolicyListQuery {
  pageNum: number
  pageSize: number
  /** 政策分类 id */
  classificationId?: string
  /** 标题关键字 */
  title?: string
  sortField?: string
  sortDirection?: 'ASC' | 'DESC'
  /** 政策状态：0 已发布 */
  policyStatus?: number
}

/** 分页返回结构（totalElements 为后端返回的字符串数字） */
export interface PolicyPageResult<T> {
  content: T[]
  totalElements: number | string
}

class RegPolicyApi {
  // 政策分类列表
  @Post('unifiedPortal/classificationList')
  static getClassificationList: RequestFn<
    PolicyClassificationQuery,
    PortalApiResponse<PolicyPageResult<PolicyClassificationItem>>
  >

  // 登记政策列表
  @Post('unifiedPortal/policyList')
  static getPolicyList: RequestFn<
    PolicyListQuery,
    PortalApiResponse<PolicyPageResult<PolicyItem>>
  >
}

export default RegPolicyApi
