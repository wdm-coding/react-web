// 字典key联合类型
export type EnumKey = keyof typeof EnumMap
// 是否
export const whetherEnum = [
  { label: '是', value: '1' },
  { label: '否', value: '2' }
]
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
    value: '2',
    subTitle: '变更'
  },
  {
    label: '更正登记',
    value: '3',
    subTitle: '更正'
  },
  {
    label: '注销登记',
    value: '4',
    subTitle: '注销'
  },
  {
    label: '续展登记',
    value: '5',
    subTitle: '续展'
  }
]
// 数据登记类型
export const dataRegistTypeEnum = [
  {
    label: '公共数据资源',
    value: '1'
  },
  {
    label: '公共数据产品和服务',
    value: '2'
  }
]
// 授权运营情况
export const authOperationStatusEnum = [
  { label: '已授权', value: '1' },
  { label: '未授权', value: '2' }
]
// 数据分类
export const dataTypeEnum = [
  { label: '公共数据', value: '1' },
  { label: '企业数据', value: '2' },
  { label: '个人数据', value: '3' }
]
// 数据产生方式
export const productionMethodEnum = [
  {
    label: '人工采集',
    value: '1',
    desc: '指通过人力手动收集数据的过程，如填写纸质表格、观察记录、访谈、问卷调查等获取数据。'
  },
  {
    label: '信息系统产生',
    value: '2',
    desc: '指通过计算机软件或业务系统在处理业务过程中产生的数据。'
  },
  {
    label: '感知设备采集',
    value: '3',
    desc: '指通过传感器、摄像头、麦克风等物联网（IoT）设备自动获取的数据。'
  },
  {
    label: '二次加工',
    value: '4',
    desc: '指对已有的数据进行进一步处理或转换，以生成新的数据或信息。如包括数据清洗、转换、聚合等。'
  },
  {
    label: '其他',
    value: '6',
    desc: '指除上述选项外其他的数据产生方式。'
  }
]
// 数据结构
export const dataStructureEnum = [
  { label: '结构化数据', value: '1' },
  { label: '半结构化数据', value: '2' },
  { label: '非结构化数据', value: '3' },
  { label: '其他', value: '4' }
]
// 数据提供格式
export const dataProvisionFormatEnum = [
  { label: 'JSON', value: '1' },
  { label: 'XML', value: '2' },
  { label: 'Excel', value: '3' },
  { label: 'Word', value: '4' },
  { label: '其他', value: '5' }
]
// 存储方式
export const storageMethodEnum = [
  { label: '关系型数据库存储', value: '1' },
  { label: '键值数据库存储', value: '2' },
  { label: '列数据库存储', value: '3' },
  { label: '图数据库存储', value: '4' },
  { label: '文档数据库存储', value: '5' },
  { label: '对象数据库存储', value: '6' },
  { label: '其他', value: '7' }
]
// 更新频率
export const updateFrequencyEnum = [
  { label: '按时更新', value: '1' },
  { label: '按天更新', value: '2' },
  { label: '按周更新', value: '3' },
  { label: '按月更新', value: '4' },
  { label: '按季度更新', value: '5' },
  { label: '按年更新', value: '6' },
  { label: '不更新', value: '7' },
  { label: '其他', value: '11' }
]
// 更新方式
export const updateMethodEnum = [
  { label: '全量更新', value: '1' },
  { label: '增量更新', value: '2' }
]
// 存证方式
export const depositMethodEnum = [
  { label: '登记主体自证', value: '1' },
  { label: '第三方机构证明', value: '2' }
]
// 共享类型
export const sharingTypeEnum = [
  { label: '无条件共享', value: '1' },
  { label: '有条件共享', value: '2' },
  { label: '不予共享', value: '3' }
]
// 共享方式
export const sharingMethodEnum = [
  { label: '共享平台获取', value: '1' },
  { label: '邮件', value: '2' },
  { label: '拷盘', value: '3' },
  { label: '介质交换', value: '4' },
  { label: '其他', value: '5' }
]
// 是否基于已有成果填报
export const basedDataDirectoryEnum = [
  { label: '基于2017年政务信息资源目录', value: '1' },
  { label: '基于2022年政务数据目录', value: '2' },
  { label: '不基于已有成果填报', value: '3' }
]
// 产品用途
export const productUsageEnum = [
  { label: '数据公共治理、公益事业安全风险评估', value: '1' },
  { label: '产品发展、行业发展', value: '2' }
]
// 脱敏方式
export const desensitizationMethodEnum = [
  { label: '替换脱敏', value: '1' },
  { label: '加密脱敏', value: '2' },
  { label: '伪装脱敏', value: '3' },
  { label: '数据扰动', value: '4' },
  { label: '数据分割', value: '5' },
  { label: '伪数据生成', value: '6' },
  { label: '其他', value: '7' }
]
// 审核类型
export const regApplyTypeEnum = [
  {
    label: '登记通过',
    value: 9,
    btn: ['detail', 'seeConfim'],
    color: '#52C41A'
  },
  {
    label: '主体驳回',
    value: -1,
    btn: ['detail'],
    color: '#FF4D4F'
  },
  {
    label: '退回补正',
    value: -5,
    btn: ['edit', 'detail'],
    color: '#FF4D4F'
  },
  {
    label: '不通过',
    value: 11,
    btn: ['detail'],
    color: '#FF4D4F'
  },
  {
    label: '制证',
    value: 8,
    btn: ['detail'],
    color: '#52C41A'
  },
  {
    label: '公示挂起',
    value: 10,
    btn: ['detail'],
    color: '#52C41A'
  },
  {
    label: '注销成功',
    value: -7,
    btn: ['detail'],
    color: '#FF4D4F'
  },
  {
    label: '已撤销',
    value: -3,
    btn: ['detail'],
    color: '#FF4D4F'
  },
  {
    label: '已作废',
    value: -4,
    btn: ['detail'],
    color: '#FF4D4F'
  },
  {
    label: '草稿',
    value: -8,
    btn: ['edit', 'delete'],
    color: '#000'
  },
  {
    label: '主体审核',
    value: 1,
    btn: ['detail', 'cancelReg'],
    color: '#52C41A'
  },
  {
    label: '已提交',
    value: -6,
    btn: ['detail', 'cancelReg'],
    color: '#52C41A'
  },
  {
    label: '待受理',
    value: 2,
    btn: ['detail', 'cancelReg'],
    color: '#1677FF'
  },
  {
    label: '受理中',
    value: 3,
    btn: ['detail', 'cancelReg'],
    color: '#52C41A'
  },
  {
    label: '拒绝登记',
    value: -2,
    btn: ['detail', 'cancelReg'],
    color: '#FF4D4F'
  },
  {
    label: '待审批',
    value: 4,
    btn: ['detail', 'cancelReg'],
    color: '#52C41A'
  },
  {
    label: '审批中',
    value: 5,
    btn: ['detail'],
    color: '#52C41A'
  },
  {
    label: '复审中',
    value: 6,
    btn: ['detail'],
    color: '#52C41A'
  },
  {
    label: '公示中',
    value: 7,
    btn: ['detail', 'cancelReg'],
    color: '#52C41A'
  }
]
// 登记状态
export const changeStatusEnum = [
  { label: '申请中', value: '1' },
  { label: '已登记', value: '2' },
  { label: '登记不通过', value: '3' },
  { label: '已注销', value: '4' }
]
const EnumMap = {
  whetherEnum,
  regApproTypeEnum,
  dataRegistTypeEnum,
  authOperationStatusEnum,
  dataTypeEnum,
  productionMethodEnum,
  dataStructureEnum,
  dataProvisionFormatEnum,
  storageMethodEnum,
  updateFrequencyEnum,
  updateMethodEnum,
  depositMethodEnum,
  sharingTypeEnum,
  sharingMethodEnum,
  basedDataDirectoryEnum,
  productUsageEnum,
  desensitizationMethodEnum,
  changeStatusEnum
}
// 将字典转换为枚举
export const dictToEnum = (enumKey: EnumKey) => {
  // 生成对象，key为value，value为label
  const enumMap: Record<string, string> = {}
  EnumMap[enumKey].forEach((item) => {
    enumMap[item.value] = item.label
  })
  return enumMap
}

// 根据枚举值获取枚举标签
export const getEnumLabel = (
  enumKey: EnumKey,
  value: string | number | string[]
) => {
  if (Array.isArray(value)) {
    return value.map((item) => getEnumLabel(enumKey, item))?.join('、') || ''
  }
  const enumItems = dictToEnum(enumKey)
  return enumItems[value] || value
}
