/** 异议申诉管理查询参数 */
export interface ObjectionListQuery {
  pageNum: number
  pageSize: number
  /** 排序字段 */
  sortField: 'updatedTime'
  /** 排序方向 */
  sortDirection: 'DESC' | 'ASC'
  /** 查询类型 1：我提交的 2：我接收的 */
  queryType: '1' | '2'
  /** 登记数据名称 */
  dataRegistName?: string
  /** 登记数据主体 */
  institutionName?: string
  /** 申诉流水号 */
  serialNumber?: string
  /** 异议状态 */
  examineStatus?: any[]
}

/** 异议申诉管理查询列表项 */
export interface ObjectionItem {
  /** 申诉流水号 */
  objectionNo: string
  /** 登记数据名称 */
  dataRegistName: string
  /** 登记数据主体 */
  institutionName: string
  /** 异议状态 */
  examineStatus: string
  /** 提交时间 */
  submitTime: string
}
