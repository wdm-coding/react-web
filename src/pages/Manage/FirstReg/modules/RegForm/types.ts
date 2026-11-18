// 被授权登记数据列表项
export type authOperatItem = {
  id: any
  dataRegistName2?: string
  dataRegistCode2?: string
  authOperatTimeRange2?: string[]
}
// 共有数据信息列表项
export type shareDataItem = {
  id: any
  sharedInstitutionName?: string
  sharedInstitutionCode?: string
  sharedInstitutionType?: string
  sharedInstitutionAddress?: string
  sharedInstitutionAuthorization?: string
}
