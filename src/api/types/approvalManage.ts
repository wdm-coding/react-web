// 审批待办-我的待办/已办-登记审批列表-查询参数
export interface ApprovaListQuery {
  pageNum: number
  pageSize: number
  sortDirection: 'DESC' | 'ASC'
  sortField: 'updatedTime'
  personage?: boolean
  /** 审批状态（有值才传） */
  status?: string[]
  /** 登记数据名称（有值才传） */
  dataRegistName?: string
  /** 登记数据类型（有值才传） */
  dataRegistType?: number
}
// 审批待办-我的待办/已办-登记审批列表-列表项
export interface ApprovaListItem {
  applyNo: string
  dataRegistName: string
  dataRegistType: number
  status: string
  applicantName: string
  applyTime: string
}

// 审批待办-我的待办-申请加入处理-查询参数
export interface JoinListQuery {
  pageNum: number
  pageSize: number
  sortField: 'updatedTime'
  sortDirection: 'DESC' | 'ASC'
  state?: number[] | number
  userName?: string
  approvalStatus?: number[] | number
}
// 审批待办-我的待办/已办-申请加入处理-列表项
export interface JoinListItem {
  userName: string
  mobile: string
  approvalStatus: number
  applyTime: string
}

/** 申请加入处理列表项（TODO: 待接口就绪后核对字段） */
export interface JoinApplyItem {
  id: string
  /** 用户姓名 */
  userName: string
  /** 手机号 */
  mobile: string
  /** 处理状态 */
  handleStatus: string
  /** 申请时间 */
  applyTime: string
}
