import type { DisclosureDetailItem } from '@/api/portal/inforDisclosure'

/** 登记状态文案：1-已登记，0-拟登记 */
const REGISTER_STATUS: Record<string, string> = {
  '1': '已登记',
  '0': '拟登记'
}

const formatText = (value?: string | number) =>
  value === undefined || value === null || value === '' ? '-' : String(value)

export const formatRegisterStatus = (value?: string | number) =>
  REGISTER_STATUS[String(value)] ?? formatText(value)

/** 实施机构详情表格行 */
export interface ExecuteOrgRow {
  key: string
  resourceName: string
  registerStatus: string
  grantType: string
  pricing: string
  institutionName: string
  term: string
  year: string
  /** 前 5 列按资源合并单元格 */
  rowSpan: number
}

/** 运营机构详情表格行 */
export interface OperateOrgRow {
  key: string
  resourceName: string
  registerStatus: string
  grantType: string
  scene: string
  pricing: string
  institutionName: string
  dataRegistName: string
  orgRegisterStatus: string
  term: string
  year: string
  /** 前 5 列按资源合并单元格 */
  rowSpan: number
}

/**
 * 将实施机构详情接口数据展开为表格行：
 * 一个资源对应多个运营机构，资源相关列按机构数量合并。
 */
export const buildExecuteRows = (
  list: DisclosureDetailItem[] = []
): ExecuteOrgRow[] =>
  list.flatMap((item) => {
    const children = item.basicPublicList ?? []
    return children.map((child, index) => ({
      key: `${item.id}-${index}`,
      resourceName: formatText(item.resourceName),
      registerStatus: formatRegisterStatus(item.registerStatus),
      grantType: formatText(item.grantType),
      pricing: formatText(item.pricing),
      institutionName: formatText(child.institutionName),
      term: formatText(child.term),
      year: formatText(child.year),
      rowSpan: index === 0 ? children.length : 0
    }))
  })

/**
 * 将运营机构详情接口数据展开为表格行：
 * 一个产品对应多个实施机构，产品相关列按机构数量合并。
 */
export const buildOperateRows = (
  list: DisclosureDetailItem[] = []
): OperateOrgRow[] =>
  list.flatMap((item) => {
    const children = item.basicPublicList ?? []
    return children.map((child, index) => ({
      key: `${item.id}-${index}`,
      resourceName: formatText(item.resourceName),
      registerStatus: formatRegisterStatus(item.registerStatus),
      grantType: formatText(item.grantType),
      scene: formatText(item.scene),
      pricing: formatText(item.pricing),
      institutionName: formatText(child.institutionName),
      dataRegistName: formatText(child.dataRegistName),
      orgRegisterStatus: formatRegisterStatus(child.registerStatus),
      term: formatText(child.term),
      year: formatText(child.year),
      rowSpan: index === 0 ? children.length : 0
    }))
  })
