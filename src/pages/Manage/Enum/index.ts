// 字典key联合类型
export type EnumKey = keyof typeof EnumMap
// 登记申请类型
export const regApproTypeEnum = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: '首次登记',
    value: '1'
  },
  {
    label: '变更登记',
    value: '2'
  },
  {
    label: '更正登记',
    value: '3'
  },
  {
    label: '注销登记',
    value: '4'
  },
  {
    label: '续展登记',
    value: '5'
  }
]
// 数据登记类型
export const dataRegistTypeEnum = [
  {
    label: '数据资源',
    value: '1'
  },
  {
    label: '公共数据产品和服务',
    value: '2'
  }
]
const EnumMap = {
  regApproTypeEnum,
  dataRegistTypeEnum
}
// 将字典转换为枚举
export const dictToEnum = (enumKey: EnumKey) => {
  const dict = EnumMap[enumKey]
  // 生成对象，key为value，value为label
  return dict.reduce(
    (prev, cur) => ({
      ...prev,
      [cur.value]: cur.label
    }),
    {}
  )
}

// 根据枚举值获取枚举标签
export const getEnumLabel = (enumKey: EnumKey, value: string) => {
  const enumItems = dictToEnum(enumKey)
  return enumItems[value] || value
}
