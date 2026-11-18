import { ProFormInstance } from '@ant-design/pro-components'

export const rules = {
  baseData: {
    coverageArea: [{ required: true, message: '请选择资源覆盖地区' }],
    industry: [{ required: true, message: '请选择行业分类' }],
    dataRegistName: [{ required: true, message: '请输入项目名称' }],
    dataRegistType: [{ required: true, message: '请选择登记数据类型' }],
    dataCoverageTimeRange: [
      { required: true, message: '请选择数据覆盖时间范围' }
    ],
    authOperationStatus: [{ required: true, message: '请选择授权运营情况' }],
    authOperatEntityName: [{ required: true, message: '请输入运营机构名称' }],
    authOperatEntityCode: [{ required: true, message: '请输入运营机构代码' }],
    authOperatTimeRange: [{ required: true, message: '请输入授权运营时间' }],
    infoSecurityAssessReport: [
      { required: false, message: '请上传数据安全风险评估报告' }
    ],
    dataType: [{ required: true, message: '请选择数据分类' }],
    dataContentIntroduction: [
      { required: true, message: '请输入数据内容简介' }
    ],
    dataLabel: [{ required: true, message: '请输入数据标签' }],
    dataProductAndServicesType: [
      { required: true, message: '请选择公共数据产品或服务类型' }
    ],
    dataProductsAndServicesOtherType: [
      { required: true, message: '请输入其他数据产品或服务类型' }
    ],
    authResourceDevelop: [
      { required: true, message: '请选择是否基于被授权资源开发' }
    ],
    authOperatList: [{ required: true, message: '请输入被授权资源信息' }],
    dataRegistName2: [{ required: true, message: '请输入被授权登记数据名称' }],
    dataRegistCode2: [{ required: true, message: '请输入被授权数据登记编码' }],
    authOperatTimeRange2: [{ required: true, message: '请输入被授权运营时间' }],
    productAndServiceDetails: [
      { required: true, message: '请上传产品和服务详情' }
    ],
    productUsage: [{ required: true, message: '请选择产品用途' }]
  },
  proxyData: {
    name: [{ required: true, message: '请输入项目名称' }]
  }
}
export const Enum = {
  // 登记数据类型
  dataRegistTypeEnum: [
    {
      label: '公共数据资源',
      value: '1'
    },
    {
      label: '公共数据产品和服务',
      value: '2'
    }
  ],
  // 授权运营情况
  authOperationStatusEnum: [
    { label: '已授权', value: '1' },
    { label: '未授权', value: '2' }
  ],
  // 公共数据产品和服务类型
  dataProductAndServicesTypeEnum: [
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
  // 是否
  whetherEnum: [
    { label: '是', value: '1' },
    { label: '否', value: '2' }
  ],
  // 产品用途
  productUsageEnum: [
    { label: '数据公共治理、公益事业安全风险评估', value: '1' },
    { label: '产品发展、行业发展', value: '2' }
  ],
  // 数据分类
  dataTypeEnum: [
    { label: '公共数据', value: '1' },
    { label: '企业数据', value: '2' },
    { label: '个人数据', value: '3' }
  ]
}

// 授权运营情况改变时
export const authOperationStatusChange = (
  formIns: ProFormInstance,
  value: string
) => {
  if (value === '1') {
    formIns?.setFieldsValue({
      authOperatEntityName: '丝绸之路信息港股份有限公司',
      authOperatEntityCode: '91620100MA73UAR56E',
      authOperatTimeRange: ['2026-11-17', '2028-04-16']
    })
    return
  }
  formIns?.setFieldsValue({
    authOperatEntityName: '',
    authOperatEntityCode: '',
    authOperatTimeRange: []
  })
}

// 行业分类改变时
export const industryChange = (
  value: any[],
  createTreeData: (value: string | null) => void
) => {
  console.log(value)
  if (value.length > 0) {
    createTreeData(value[0]?.value)
  } else {
    createTreeData(null)
  }
}

// 上传文件转换为字符串
export const uploadTransform = (value: any[]) =>
  value.map((item) => item.response).join(',')
