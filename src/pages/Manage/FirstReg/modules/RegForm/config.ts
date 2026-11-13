export const rules = {
  baseData: {
    regionCoverArea: [{ required: true, message: '请选择资源覆盖地区' }],
    name: [{ required: true, message: '请输入项目名称' }],
    dataRegistName2: [{ required: true, message: '请输入被授权登记数据名称' }],
    dataRegistCode2: [{ required: true, message: '请输入被授权数据登记编码' }],
    authOperatTimeRange: [{ required: true, message: '请输入被授权运营时间' }],
  },
  proxyData: {
    name: [{ required: true, message: '请输入项目名称' }],
  },
}
export const Enum = {
  // 登记数据类型
  regDataTypeEnum: [
    {
      label: '公共数据资源',
      value: '1',
    },
    {
      label: '公共数据产品和服务',
      value: '2',
    },
  ],
  // 公共数据产品和服务类型
  dataProductAndServiceTypeEnum: [
    { label: '模型', value: '1' },
    { label: '核验', value: '2' },
    { label: '报告', value: '3' },
    { label: '数据集', value: '4' },
    { label: 'API接口', value: '5' },
    { label: '评分', value: '6' },
    { label: 'SaaS平台', value: '7' },
    { label: '认证', value: '8' },
    { label: '查验', value: '9' },
    { label: '测算', value: '10' },
    { label: '其他', value: '11' }
  ],
  // 授权运营情况
  authOperatTypeEnum: [
    { label: '已授权', value: '1' },
    { label: '未授权', value: '2' }
  ],
  // 是否
  whetherEnum: [
    { label: '是', value: '1' },
    { label: '否', value: '2' }
  ],
  // 产品用途
  productUseEnum: [
    { label: '数据公共治理、公益事业安全风险评估', value: '1' },
    { label: '产品发展、行业发展', value: '2' }
  ],
  // 数据分类
  dataTypeEnum: [
    { label: '公共数据', value: '1' },
    { label: '企业数据', value: '2' },
    { label: '个人数据', value: '3' }
  ],
}