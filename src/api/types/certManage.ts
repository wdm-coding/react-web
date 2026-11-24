/** 确认单查询参数 */
export interface ProofListQuery {
  pageNum: number
  pageSize: number
  /** 排序字段 */
  sortField: 'updatedTime'
  /** 排序方向 */
  sortDirection: 'DESC' | 'ASC'
  /** 确认单编号 */
  certificateCode?: string
  /** 登记数据名称 */
  dataRegistName?: string
  /** 确认单状态 */
  certificateStatus?: string
  /** 发证状态 */
  issuance?: string
}

/** 确认单查询列表项 */
export interface ProofItem {
  /** 确认单编号 */
  certificateCode: string
  /** 登记数据名称 */
  dataRegistName: string
  /** 登记数据类型 */
  dataRegistType: string
  /** 确认单状态 */
  certificateStatus: string
  /** 有效期起 */
  validStartTime: string
  /** 有效期止 */
  validEndTime: string
}
