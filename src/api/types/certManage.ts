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
  /** 登记数据类型 */
  dataRegistType: string
  dataRegistTypeDesc: string
  dataRegistCode: string
  dataRegistId: string
  dataRegistName: string
  institutionName: string
  certificateStatus: string
  certificateStatusDesc: string
  certificateProcessStatus: number
  certificateProcessStatusDesc: string
  cvalidityDeadline: string
  distributionTime: string
  validityPeriodStartTime: string
  certificateCode: string
  certificateId: string
  certificatePicBase64: string
  certificateBase64: string
}
