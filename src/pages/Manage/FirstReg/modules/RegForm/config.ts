// 表单校验规则
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

// 枚举值
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

// 提示信息
export const tooltips = {
  coverageArea:
    '提示：指“数据资源”收集数据所涵盖的地理区域范围或“公共数据产品和服务”运营所涵盖的地理区域范围。',
  industry:
    '提示：指将“数据资源”或“公共数据产品和服务”按照一定的业务属性或领域特征进行区分和归类，以便更好地管理和使用这些资源。',
  dataRegistName:
    '提示：（1）数据名称应突出数据内容对象及显著特征，分为三部分：资源覆盖范围-国民经济行业大类-XXXXX。例如：全国-农业-XXX数据。（2）资源覆盖范围如涉及多个省份，可简写。例如：北京河北等10省-农业-XXXX。名称总字数不超过50个字。覆盖的全部省份应在内容简介中描述完整。',
  dataRegistType:
    '提示： 根据数据集的适用场景选择对应的登记数据类型。1.数据资源：指无论以电子形式还是其他介质存储，具有潜在价值并被用来创造新的信息、知识或洞见的原始数据集合。2.公共数据产品和服务：指基于数据资源，经过加工、处理、分析后形成的具有特定功能、用途或价值的产品或服务。',
  dataCoverageTimeRange:
    '提示：指“数据资源”数据集所涵盖的时间范围。例如，一个数据集是关于某个城市过去一年的用水情况，那么数据覆盖时间则可能从去年的某月某日至今年的同一日期。',
  authOperationStatus: '提示：根据实际情况选择“数据资源”的授权运营情况。',
  authOperatEntityName:
    '提示：按照规范程序获得授权，对本“数据资源”进行开发运营的法人组织名称。',
  authOperatEntityCode:
    '提示：按照规范程序获得授权，对本“数据资源”进行开发运营的法人组织统一社会信用代码。',
  authOperatTimeRange: '提示：授权该法人组织进行开发运营的具体时间范围。',
  infoSecurityAssessReport:
    '提示：数据安全风险评估报告：指对“数据资源”进行信息安全风险评估与审查后产生的详细报告。',
  dataContentIntroduction:
    '提示：对数据资源的基本信息和特点进行简要描述，主要包括数据的来源、内容和应用等。',
  dataLabel:
    '提示：①请分别从数据来源、数据内容、行业分布、数据应用、数据质量的维度填写标签。②多个标签用英文逗号分隔。',
  dataProductAndServicesType:
    '提示：指“公共数据产品和服务”以数据为核心，通过技术手段进行加工处理，最终模型、核验、报告、数据集等多种形式呈现。1.模型：指基于大量数据，通过数学、统计学、机器学习等方法构建的一种抽象表达，用于描述现实世界中的某种现象、规律或关系。在数据产品和服务中，模型通常用于预测、分类、聚类、优化等任务，是数据分析和智能决策的重要工具。2.核验：指对数据的真实性、准确性、完整性、一致性等方面进行验证和检查的过程。在公共数据产品和服务中，核验是确保数据质量和数据安全的重要环节。通过对数据的核验，可以及时发现和纠正数据中的错误和异常，提高数据的可信度和可用性。3.报告：指基于数据分析和处理的结果，以结构化的方式呈现关键信息、洞察和结论。4.数据集：指通常由一系列相关的、结构化的数据组成，用于支持数据分析、机器学习、数据挖掘等应用。5.API接口：指通过API接口允许开发者访问和操作数据服务提供者的数据资源，实现数据的共享和整合。6.其他：除上述选项外其他的公共数据产品和服务的类型。',
  authResourceDevelop:
    '提示：指当前机构申请登记的“公共数据产品和服务”是否基于某个或某些已获得授权的数据资源进行开发。',
  dataRegistName2: '提示：指被授权运营“数据资源”的登记数据名称。',
  dataRegistCode2:
    '提示：指被授权运营“数据资源”的唯一标识编码。例如：DA.CN.01.00.11001.2501.33441AZ851',
  authOperatTimeRange2:
    '提示：指“数据资源”被授权给各级党政机关或企事业单位等进行运营、使用的具体时间范围。',
  productUsage: '提示：根据实际业务情况选择公共数据产品和服务的用途。'
}

// 上传文件转换为字符串
export const uploadTransform = (value: any[]) =>
  value?.map((item) => item.response).join(',') || ''
