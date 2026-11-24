/** 登记申请列表查询参数 */
export interface RegApplyListQuery {
  pageNum: number
  pageSize: number
  /** 登记申请类型（页签） */
  regApproType?: string
  /** 排序字段 */
  sortField: 'updatedTime'
  /** 排序方向 */
  sortDirection: 'DESC' | 'ASC'
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

/** 登记数据查询参数 */
export interface RegDataListQuery {
  pageNum: number
  pageSize: number
  /** 排序字段 */
  sortField: 'updatedTime'
  /** 排序方向 */
  sortDirection: 'DESC' | 'ASC'
  /** 登记数据名称 */
  dataRegistName?: string
  /** 登记数据类型 */
  dataRegistType?: string
  /** 登记状态 */
  changeStatus?: string
  /** 登记主体 */
  institutionName?: string
  /** 申请时间-开始 */
  regApproStartTime?: string
  /** 申请时间-结束 */
  regApproEndTime?: string
}

/** 登记数据查询列表项 */
export interface RegDataItem {
  dataRegistId: string
  /** 登记数据名称 */
  dataRegistName: string
  /** 登记数据类型 */
  dataRegistType: string
  /** 登记状态 */
  changeStatus: string
  /** 登记主体 */
  institutionName: string
  /** 登记申请类型 */
  regApproType: string
  /** 申请时间 */
  applyForTime: string
  /** 确认单编号 */
  confirmNumber?: string
  /** 登记机构 */
  organizationName?: string
}

/** 获取可操作的登记数据列表查询参数 */
export interface RegScreeningQuery {
  pageNum: number
  pageSize: number
  // 是否个人用户
  personage?: boolean
  // 登记申请类型
  regApproType?: string
}
