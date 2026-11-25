/** 机构用户管理列表查询参数 */
export interface InsUserListQuery {
  pageNum: number
  pageSize: number
  /** 记录类型 0：申请加入机构 1：机构邀请加入 -3：解绑记录 */
  type: string
  /** 用户姓名 */
  userName?: string
}

/** 机构用户管理列表项 */
export interface InsUserItem {
  id: string
  /** 用户账号（证件号码） */
  idNumber: string
  /** 用户姓名 */
  userName: string
  /** 申请/邀请状态 */
  status: string
  /** 不通过说明 */
  refuseReason?: string
  /** 申请时间 */
  applyTime?: string
  /** 审核时间 */
  examineTime?: string
  /** 邀请时间 */
  inviteTime?: string
  /** 确认时间 */
  confirmTime?: string
  /** 解绑时间 */
  unbindTime?: string
}

/** 主体账号信息/个人账号基本信息 */
export interface AccountInfo {
  /** 主体名称 */
  institutionName: string
  /** 统一社会信用代码 */
  institutionCode: string
  /** 主体性质 */
  institutionType: string
  /** 注册国家 */
  country: string
  /** 注册地址 */
  region: string
  /** 主体登记ID */
  subjectRegistrationId: string
  /** 法人名称 */
  corpnName: string
  /** 法人证件类型 */
  corpnIdType: string
  /** 法人身份证号 */
  corpnIdNumber: string
  /** 法人手机号 */
  corpnTelephone: string
  /** 用户名称 */
  userName: string
  /** 联系电话 */
  telephone: string
  /** 证件类型 */
  idType: string
  /** 证件号码 */
  idNumber: string
  /** 证件有效期起 */
  idStartTime: string
  /** 证件有效期止 */
  idEndTime: string
  /** 创建时间 */
  createdTime: string
  /** 最后登录时间 */
  lastLoginTime: string
}
