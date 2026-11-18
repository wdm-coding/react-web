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
    isProxyRegist: [{ required: true, message: '请选择是否委托代理登记' }],
    proxyEntityName: [{ required: true, message: '请输入委托登记主体名称' }],
    proxyEntityCode: [{ required: true, message: '请输入委托登记主体代码' }],
    proxyTimeRange: [{ required: true, message: '请选择委托代理时间' }],
    proxyAgreement: [{ required: true, message: '请上传委托代理协议书' }]
  },
  sceneData: {
    ableScene: [{ required: true, message: '请输入数据场景' }],
    disableScene: [{ required: true, message: '请输入禁用场景' }]
  },
  sharedData: {
    sharedData: [{ required: true, message: '请选择是否共有数据' }],
    sharedDataList: [{ required: true, message: '请填写共有数据信息' }],
    sharedInstitutionName: [{ required: true, message: '请输入共有主体名称' }],
    sharedInstitutionCode: [
      { required: true, message: '请输入统一社会信用代码' }
    ],
    sharedInstitutionType: [{ required: true, message: '请选择共有主体性质' }],
    sharedInstitutionAddress: [
      { required: true, message: '请输入共有组织机构注册地址' }
    ]
  },
  openData: {
    sharingType: [{ required: true, message: '请选择共享类型' }],
    sharingConditions: [{ required: false, message: '请输入共享条件' }],
    sharingMethod: [{ required: true, message: '请选择共享方式' }],
    sharingOtherMethod: [{ required: true, message: '请输入其他共享方式' }],
    socialOpenness: [{ required: true, message: '请选择是否向社会开放' }],
    opennessConditions: [{ required: true, message: '请输入开放条件' }]
  },
  storageData: {
    productionMethod: [{ required: true, message: '请选择数据产生方式' }],
    productionOtherMethod: [
      { required: true, message: '请输入其他数据产生方式说明' }
    ],
    dataStructure: [{ required: true, message: '请选择数据结构' }],
    dataOtherStructure: [{ required: true, message: '请输入其他数据数据结构' }],
    dataProvisionFormat: [{ required: true, message: '请选择数据提供格式' }],
    dataProvisionOtherFormat: [
      { required: true, message: '请输入其他数据提供格式' }
    ],
    storageMethod: [{ required: true, message: '请选择数据存储方式' }],
    storageOtherMethod: [{ required: true, message: '请输入其他数据存储方式' }],
    dataStorage: [{ required: true, message: '请输入数据存储量(初始)' }],
    dataStorageUnit: [{ required: true, message: '请选择单位' }],
    updateFrequency: [{ required: true, message: '请选择更新频率' }],
    updateOtherFrequency: [
      { required: true, message: '请输入其他数据更新频率' }
    ],
    updateMethod: [{ required: true, message: '请选择更新方式' }],
    dataStorageIncrease: [
      { required: true, message: '请输入数据存储量(增长)' }
    ],
    sensitiveInformation: [
      { required: true, message: '请选择是否包含敏感信息' }
    ],
    sensitiveInvolvingSubject: [{ required: true, message: '请选择涉及主体' }],
    sensitiveDataCoverageNumber: [
      { required: true, message: '请输入数据覆盖数量' }
    ],
    desensitizationSituation: [{ required: true, message: '请选择是否脱敏' }],
    desensitizationMethod: [{ required: true, message: '请选择脱敏方式' }],
    desensitizationOtherMethod: [
      { required: true, message: '请输入其他脱敏方式' }
    ],
    depositMethod: [{ required: true, message: '请选择存证方式' }],
    depositDescription: [{ required: true, message: '请输入存证方式说明' }],
    depositProofDocument: [{ required: false, message: '请上传存证证明文件' }],
    depositDataPath: [{ required: false, message: '请输入存证数据存放路径' }]
  },
  direcData: {
    basedDataDirectory: [{ required: true, message: '请选择基于数据目录' }],
    demandFile: [{ required: true, message: '请上传上传数据字段项' }],
    sampleData: [{ required: true, message: '请上传样例数据' }]
  },
  dataSource: {
    dataSourceCommitment: [
      { required: true, message: '请上传数据合规性来源及承诺文件' }
    ]
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
  ],
  // 共有主体性质枚举
  sharedInstitutionTypeEnum: [
    { label: '政府机构', value: '1' },
    { label: '国有企业', value: '2' },
    { label: '集体所有制企业', value: '3' },
    { label: '联营企业', value: '4' },
    { label: '私营企业', value: '5' },
    { label: '股份制企业', value: '6' },
    { label: '外资企业', value: '7' },
    { label: '合资企业', value: '8' }
  ],
  // 共享类型
  sharingTypeEnum: [
    { label: '无条件共享', value: '1' },
    { label: '有条件共享', value: '2' },
    { label: '不予共享', value: '3' }
  ],
  // 共享方式
  sharingMethodEnum: [
    { label: '共享平台获取', value: '1' },
    { label: '邮件', value: '2' },
    { label: '拷盘', value: '3' },
    { label: '介质交换', value: '4' },
    { label: '其他', value: '5' }
  ],
  // 数据产生方式
  productionMethodEnum: [
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
  ],
  // 数据结构
  dataStructureEnum: [
    { label: '结构化数据', value: '1' },
    { label: '半结构化数据', value: '2' },
    { label: '非结构化数据', value: '3' },
    { label: '其他', value: '4' }
  ],
  // 数据提供格式
  dataProvisionFormatEnum: [
    { label: 'JSON', value: '1' },
    { label: 'XML', value: '2' },
    { label: 'Excel', value: '3' },
    { label: 'Word', value: '4' },
    { label: '其他', value: '5' }
  ],
  // 存储方式
  storageMethodEnum: [
    { label: '关系型数据库存储', value: '1' },
    { label: '键值数据库存储', value: '2' },
    { label: '列数据库存储', value: '3' },
    { label: '图数据库存储', value: '4' },
    { label: '文档数据库存储', value: '5' },
    { label: '对象数据库存储', value: '6' },
    { label: '其他', value: '7' }
  ],
  // 存储量单位
  dataStorageUnitEnum: [
    { label: 'KB', value: 'KB' },
    { label: 'MB', value: 'MB' },
    { label: 'GB', value: 'GB' },
    { label: 'TB', value: 'TB' }
  ],
  // 更新频率
  updateFrequencyEnum: [
    { label: '按时更新', value: '1' },
    { label: '按天更新', value: '2' },
    { label: '按周更新', value: '3' },
    { label: '按月更新', value: '4' },
    { label: '按季度更新', value: '5' },
    { label: '按年更新', value: '6' },
    { label: '不更新', value: '7' },
    { label: '其他', value: '11' }
  ],
  // 更新方式
  updateMethodEnum: [
    { label: '全量更新', value: '1' },
    { label: '增量更新', value: '2' }
  ],
  // 涉及主体
  sensitiveInvolvingSubjectEnum: [
    { label: '企业主体', value: '1' },
    { label: '个人主体', value: '2' },
    { label: '企业主体和个人主体', value: '3' }
  ],
  // 脱敏方式
  desensitizationMethodEnum: [
    { label: '替换脱敏', value: '1' },
    { label: '加密脱敏', value: '2' },
    { label: '伪装脱敏', value: '3' },
    { label: '数据扰动', value: '4' },
    { label: '数据分割', value: '5' },
    { label: '伪数据生成', value: '6' },
    { label: '其他', value: '7' }
  ],
  // 存证方式
  depositMethodEnum: [
    { label: '登记主体自证', value: '1' },
    { label: '第三方机构证明', value: '2' }
  ],
  // 是否基于已有成果填报
  basedDataDirectoryEnum: [
    { label: '基于2017年政务信息资源目录', value: '1' },
    { label: '基于2022年政务数据目录', value: '2' },
    { label: '不基于已有成果填报', value: '3' }
  ]
}

// 提示信息
export const tooltips = {
  // 数据基本信息
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
  productUsage: '提示：根据实际业务情况选择公共数据产品和服务的用途。',
  // 委托代理信息
  isProxyRegist: '提示：指是否委托代理机构代为办理本机构的数据登记申请。',
  proxyEntityName: '提示：指受委托代为办理本机构数据登记申请的主体名称。',
  proxyEntityCode:
    '提示：指受委托代为办理本机构数据登记申请主体的统一社会信用代码。',
  proxyTimeRange: '提示：指委托代理机构代为办理登记的具体时间范围。',
  proxyAgreement: '提示：指本机构与受托主体签订的委托代理协议书。',
  // 数据场景
  ableScene:
    '提示：指描述当前“数据资源”或“数据产品和服务”可使用的场景。当为“数据资源”时显示数据场景；当为“数据产品和服务”时显示应用场景。',
  disableScene:
    '提示：指描述当前“数据资源”或“数据产品和服务”可使用的场景。当为“数据资源”时显示数据场景；当为“数据产品和服务”时显示应用场景。',
  // 共有数据信息
  sharedData: '提示：指是否共有数据资源。',
  sharedInstitutionAuthorization: '提示：指共有数据资源的授权运营情况。',
  // 数据共享开放信息
  sharingConditions:
    '提示：无条件共享类和有条件共享类的政务信息资源，应标明使用要求，包括作为行政依据、工作参考，用于数据校核、业务协同等；有条件共享类的政务信息资源，还应注明共享条件和共享范围；对于不予共享类的政务信息资源，应注明相关的法律、行政法规或党中央、国务院政策依据。',
  sharingMethod:
    '提示：无条件共享类和有条件共享类的政务信息资源，应标明使用要求，包括作为行政依据、工作参考，用于数据校核、业务协同等；有条件共享类的政务信息资源，还应注明共享条件和共享范围；对于不予共享类的政务信息资源，应注明相关的法律、行政法规或党中央、国务院政策依据。',
  sharingOtherMethod: '请详细描述除上述选项外的共享方式',
  opennessConditions: '提示：描述对数据开放的约束条件',
  // 数据存储信息
  productionMethod:
    '提示： ①原始数据：指未经任何处理或转换的初始数据。 ②人工采集：指通过人力手动收集数据的过程。如填写纸质表格、观察记录、访谈、问卷调查等获取数据。 ③信息系统产生：指通过计算机软件或业务系统在处理业务过程中产生的数据。 ④感知设备采集：指通过传感器、摄像头、麦克风等物联网（IoT）设备自动获取的数据。 ⑤二次加工：指对已有的数据进行进一步处理或转换，以生成新的数据或信息。如包括数据清洗、转换、聚合、挖掘等操作。 ⑥其他：除上述选项外其他的数据产生方式。',
  productionOtherMethod: '请详细描述除上述选项外的数据产生方式',
  dataStructure:
    '提示： ①结构化数据：指按照一定的规则或格式组织存储的数据，具有固定的数据模型和数据结构。通常可以被存储在关系型数据库中以表格的形式呈现，其中包含明确的字段、类型和关系。 ②半结构化数据：是介于结构化数据和非结构化数据之间的一种数据类型。具有一定的组织和规则，但没有固定的数据模型，通常以标签、键值对等方式表示数据的层次和语义，如XML、JSON等格式的文件。 ③非结构化数据：指数据结构不规则或不完整，没有预定义的数据模型，不方便用数据库二维逻辑表来表现的数据。它通常包括文本、图片、音频、视频、HTML文档等多种类型的信息。 ④其他：除上述选项外其他的数据结构。',
  dataOtherStructure: '请详细描述除上述选项外的数据结构',
  dataProvisionFormat:
    '提示： 指选择“数据资源”或“公共数据产品和服务”的提供方式。 ①JSON：JSON 是一种轻量级的数据交换格式，它通常以文本形式（通常是字符串）存在，当通过 JSON 提供数据时，数据被组织成键值对的形式，并封装在方括号（对于数组）或大括号（对于对象）中。 ②XML：XML 提供了一种类似于 HTML 的结构化方式来表示数据，XML 数据可以通过网络以 HTTP 响应的形式发送，或者作为文件存储在服务器上。 ③Excel：当通过 Excel 提供数据时，数据通常被组织在电子表格的单元格中，并可以包含复杂的公式、图表和格式化选项。 为了通过网络提供 Excel 数据，通常需要将其转换为更易于传输和解析的格式（如 CSV、JSON 或 XML），或者通过特定的 API 将 Excel 文件作为文件下载提供。 ④Word：数据通过Word的方式进行提供。 ⑤其他：除上述选项外其他的数据提供方式。',
  dataProvisionOtherFormat: '请详细描述除上述选项外的数据提供方式',
  storageMethod:
    '提示： ①关系型数据库存储：指采用关系模型来组织数据的数据库，它以行和列的形式存储数据。常见的关系型数据库包括Oracle、MySQL、SQL Server等。 ②键值数据库存储：指非关系型数据库，使用简单的键值对系统存储数据，常见的键值数据库包括Redis、Memcached等。 ③列数据库存储：指一种专门用于处理大规模数据分析的数据库类型，它将数据按列而不是按行存储。 ④图数据库存储：指一种用于存储实体之间关系的数据库类型，它使用图结构来表示数据，常见的图数据库包括Neo4j、ArangoDB等。 ⑤文档数据库存储：指一种以文档作为基本单位进行数据存储和管理的非关系型数据库。常见的文档数据库包括MongoDB、CouchDB等。 ⑥对象数据库存储：指一种使用对象导向模型来设计其数据结构和操作的数据库。 ⑦其他：除了上述选项外，其他的数据库存储方式。',
  storageOtherMethod: '请详细描述除上述选项外的数据存储方式',
  storageVolumeInitial: '提示：指“数据资源”在申请登记时所占用的存储空间总量。',
  updateOtherFrequency: '请详细描述除上述选项外的数据产生方式',
  updateMethod:
    '提示： 1.全量更新：指将数据源中的所有数据重新完整地同步到目标数据库或数据集中。 2.增量更新：指仅同步自上次更新以来发生变化的数据。',
  dataStorageIncrease: '提示：仅支持输入正数，根据数据存储量选择存储单位。',
  sensitiveInformation:
    '提示：指未经授权被访问、泄露、修改或滥用，可能会对个人、组织或国家的利益、安全、隐私或权益造成不利影响的信息。如个人隐私信息、商业秘密、国家机密、知识产权信息、其他敏感信息等。',
  sensitiveInvolvingSubject:
    '提示：指选择与数据直接相关或受到数据影响的主要实体。',
  sensitiveDataCoverageNumber: '提示：指的是涉及主体所覆盖的数据量。',
  desensitizationSituation:
    '提示：若提供的数据集已进行脱敏处理则选择“是”；若提供的数据集未进行脱敏处理则选择“否”。',
  desensitizationMethod:
    '提示: 1.替换脱敏：指将数据集中的敏感信息替换为其他值或占位符的过程。例如，在电话号码中，可以将区号或后四位数字替换为特定的数字或星号（*）。 2.加密脱敏：指通过加密技术来保护敏感数据的过程。只有拥有解密密钥的人才能将密文转换回明文。 3.伪装脱敏：指通过修改数据的某些特征来隐藏其真实含义的过程。例如，可以通过在数字中添加随机噪声或改变文本数据的格式来伪装数据。 4.数据扰动：通过添加随机噪声或进行其他形式的修改来扰乱数据原始值的方法。 5.数据分割：指通过将数据集分成几个部分的过程，通常是为了满足不同的隐私、安全或合规性要求。 6.伪数据生成：指创建与原始数据集具有相似统计特性和分布，但不包含任何真实敏感信息的数据集的过程。 7.其他：除上述选项外其他的脱敏方式。',
  desensitizationOtherMethod: '请详细描述除上述选项外的脱敏方式',
  depositMethod: '提示：指为了证明和记录数据存在于某个具体介质或系统中的方法。',
  depositDescription:
    '提示：指对数据存证方式的描述和解释，它明确了数据是以何种方式被存储、保护并准备进行后续追溯的，例如存储于某系统、在何区块链平台存证、在何处公证等。',
  depositProofDocument:
    '提示：指为了证明数据已经按照既定的存证方式进行存储和保护的正式文件或证据，可上传自证文件、电子版存证证书或电子版公证证书等。',

  // 数据合规性来源及承诺
  dataSourceCommitment:
    '提示：指为确保数据在各个环节中符合相关法律法规、行业标准及企业内部政策规定，而需要提供的证明材料或政策性文件。包括但不限于数据的合法来源证明及承诺、数据处理过程的合规性记录、数据使用授权的合法确认单等。'
}

// 上传文件转换为字符串
export const uploadTransform = (value: any[]) =>
  value?.map((item) => item.response).join(',') || ''
