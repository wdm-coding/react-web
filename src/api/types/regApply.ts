/** 登记申请列表查询参数 */
export interface RegApplyListQuery {
  pageNum: number
  pageSize: number
  /** 登记申请类型（页签） */
  regApproType?: string
  sortField: string
  sortDirection: string
  /** 申请流水号 */
  serialNumber?: string
  /** 登记数据名称 */
  dataRegistName?: string
  /** 登记数据类型 */
  dataRegistType?: string
}

/** 登记申请列表项 */
export interface RegApplyItem {
  dataRegistId: string
  /** 登记申请类型（页签） */
  regApproType: string
  /** 申请流水号 */
  serialNumber: string
  /** 登记数据名称 */
  dataRegistName: string
  /** 登记数据类型 */
  dataRegistType: string
  /** 登记主体名称 */
  institutionName: string
  /** 更新时间 */
  updatedTime: string
  /** 审核状态 */
  status: string
  /** 数据内容简介 */
  dataContentIntroduction?: string
}

/** 登记申请列表分页结果 */
export interface RegApplyListResult {
  content: RegApplyItem[]
  totalElements: number
}
