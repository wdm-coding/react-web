/**
 * 登记数据类型
 * 1：公共数据资源
 * 2：公共数据产品和服务
 */
export const DATA_REGIST_TYPE_OPTIONS: { label: string; value: string }[] = [
  { label: '公共数据资源', value: '1' },
  { label: '公共数据产品和服务', value: '2' }
]

/** 登记数据类型 value → label 映射，用于详情/列表展示 */
export const DATA_REGIST_TYPE_MAP: Record<string, string> = {
  '1': '公共数据资源',
  '2': '公共数据产品和服务'
}
