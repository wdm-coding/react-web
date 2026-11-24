import { ReactNode } from 'react'
import { Table } from 'antd'
import { getEnumLabel } from '@/pages/Manage/Enum/index.ts'
import { getDateRange } from '@/utils/dataTransform.ts'
import FileView from './modules/FileView/index.tsx'
interface Column {
  key: string
  label: string
  content?: string | number | ReactNode
  span?: number
  visible?: (record: any) => boolean
  render?: (record: any) => ReactNode
}

// 资源覆盖地区：嵌套结构 [[{name, code}]]，拼接每条路径名称
const renderCoverageArea = (record: any) =>
  record?.coverageAreaList
    ?.map((path: any[]) => path?.map((item: any) => item.name).join(''))
    .filter(Boolean)
    .join('、') || ''

// 行业分类：树形结构，取叶子节点名称
const getIndustryNames = (list: any[]): string[] => {
  const names: string[] = []
  const walk = (nodes: any[]) => {
    nodes?.forEach((node) => {
      if (node?.children?.length) {
        walk(node.children)
      } else if (node?.name) {
        names.push(node.name)
      }
    })
  }
  walk(list || [])
  return names
}

// 被授权资源信息表格列
const authOperatColumns = [
  {
    title: '被授权登记数据名称',
    dataIndex: 'dataRegistName2'
  },
  {
    title: '被授权数据登记编码',
    dataIndex: 'dataRegistCode2'
  },
  {
    title: '被授权运营时间',
    dataIndex: 'authOperatTimeStart2',
    render: (_: any, row: any) =>
      getDateRange(row?.authOperatTimeStart2, row?.authOperatTimeEnd2)?.join(
        ' 至 '
      ) || '-'
  }
]

// 共有数据信息表格列
const sharedDataColumns = [
  {
    title: '共有主体名称',
    dataIndex: 'sharedInstitutionName'
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'sharedInstitutionCode'
  },
  {
    title: '共有主体性质',
    dataIndex: 'sharedInstitutionType'
  },
  {
    title: '共有组织机构注册地址',
    dataIndex: 'sharedInstitutionAddress'
  },
  {
    title: '共有主体授权书',
    dataIndex: 'sharedInstitutionAuthorization',
    span: 24,
    render: (_, record) => (
      <FileView files={record?.sharedInstitutionAuthorization} />
    )
  }
]

const columns: Record<string, Column[]> = {
  // 数据基本信息
  baseData: [
    {
      label: '登记数据名称',
      key: 'dataRegistName',
      span: 24
    },
    {
      label: '资源覆盖地区',
      key: 'coverageAreaList',
      render: renderCoverageArea
    },
    {
      label: '行业分类',
      key: 'industryList',
      render: (record) => getIndustryNames(record?.industryList).join('、')
    },
    {
      label: '登记数据类型',
      key: 'dataRegistType',
      render: (record) =>
        getEnumLabel('dataRegistTypeEnum', record?.dataRegistType)
    },
    {
      label: '数据覆盖时间',
      key: 'dataCoverageTimeStart',
      visible: (record) => record?.dataRegistType === '1',
      render: (record) =>
        getDateRange(
          record?.dataCoverageTimeStart,
          record?.dataCoverageTimeEnd
        )?.join(' 至 ')
    },
    {
      label: '授权运营情况',
      key: 'authOperationStatus',
      visible: (record) => record?.dataRegistType === '1',
      render: (record) =>
        getEnumLabel('authOperationStatusEnum', record?.authOperationStatus)
    },
    {
      label: '运营机构名称',
      key: 'authOperatEntityName',
      visible: (record) =>
        record?.dataRegistType === '1' && record?.authOperationStatus === '1'
    },
    {
      label: '运营机构代码',
      key: 'authOperatEntityCode',
      visible: (record) =>
        record?.dataRegistType === '1' && record?.authOperationStatus === '1'
    },
    {
      label: '授权运营时间',
      key: 'authOperatTimeStart',
      visible: (record) =>
        record?.dataRegistType === '1' && record?.authOperationStatus === '1',
      render: (record) =>
        getDateRange(
          record?.authOperatTimeStart,
          record?.authOperatTimeEnd
        )?.join(' 至 ')
    },
    {
      label: '公共数据产品和服务类型',
      key: 'dataProductAndServicesType',
      visible: (record) => record?.dataRegistType === '2'
    },
    {
      label: '其他数据产品或服务类型',
      key: 'dataProductsAndServicesOtherType',
      visible: (record) =>
        record?.dataRegistType === '2' &&
        record?.dataProductAndServicesType === '11'
    },
    {
      label: '是否基于被授权资源开发',
      key: 'authResourceDevelop',
      visible: (record) => record?.dataRegistType === '2',
      render: (record) =>
        getEnumLabel('whetherEnum', record?.authResourceDevelop)
    },
    {
      label: '被授权资源信息',
      key: 'authOperatList',
      span: 24,
      visible: (record) =>
        record?.dataRegistType === '2' && record?.authResourceDevelop === '1',
      render: (record) => (
        <Table
          style={{ width: '100%' }}
          size='small'
          columns={authOperatColumns}
          dataSource={record?.authOperatList || []}
          rowKey={(_, index) => String(index)}
          pagination={false}
        />
      )
    },
    {
      label: '产品和服务详情',
      key: 'productAndServiceDetails',
      visible: (record) => record?.dataRegistType === '2',
      span: 24,
      render: (record) => <FileView files={record?.productAndServiceDetails} />
    },
    {
      label: '产品用途',
      key: 'productUsage',
      visible: (record) => record?.dataRegistType === '2',
      render: (record) => getEnumLabel('productUsageEnum', record?.productUsage)
    },
    {
      label: '数据分类',
      key: 'dataType',
      render: (record) => getEnumLabel('dataTypeEnum', record?.dataType)
    },
    {
      label: '数据安全风险评估报告',
      key: 'infoSecurityAssessReport',
      span: 24,
      render: (record) => <FileView files={record?.infoSecurityAssessReport} />
    },
    {
      label: '数据标签',
      key: 'dataLabel',
      span: 24
    },
    {
      label: '数据内容简介',
      key: 'dataContentIntroduction',
      span: 24
    }
  ],
  // 委托代理信息
  proxyData: [
    {
      label: '是否委托代理登记',
      key: 'entrustedAgent',
      render: (record) => getEnumLabel('whetherEnum', record?.entrustedAgent)
    },
    {
      label: '委托登记主体名称',
      key: 'entrustedAgentName',
      visible: (record) => record?.entrustedAgent === '1'
    },
    {
      label: '委托登记主体代码',
      key: 'entrustedAgentCode',
      visible: (record) => record?.entrustedAgent === '1'
    },
    {
      label: '委托代理时间',
      key: 'entrustedAgentStartTime',
      visible: (record) => record?.entrustedAgent === '1',
      render: (record) =>
        getDateRange(
          record?.entrustedAgentStartTime,
          record?.entrustedAgentEndTime
        )?.join(' 至 ')
    },
    {
      label: '委托代理协议书',
      key: 'entrustedAgentAgree',
      visible: (record) => record?.entrustedAgent === '1',
      span: 24,
      render: (record) => <FileView files={record?.entrustedAgentAgree} />
    }
  ],
  // 数据存储信息
  storageData: [
    {
      label: '数据产生方式',
      key: 'productionMethod',
      render: (record) =>
        getEnumLabel('productionMethodEnum', record?.productionMethod)
    },
    {
      label: '其他数据产生方式说明',
      key: 'productionOtherMethod',
      visible: (record) => record?.productionMethod?.includes('6')
    },
    {
      label: '数据结构',
      key: 'dataStructure',
      render: (record) =>
        getEnumLabel('dataStructureEnum', record?.dataStructure)
    },
    {
      label: '其他数据结构',
      key: 'dataOtherStructure',
      visible: (record) => record?.dataStructure === '4'
    },
    {
      label: '数据提供格式',
      key: 'dataProvisionFormat',
      render: (record) =>
        getEnumLabel('dataProvisionFormatEnum', record?.dataProvisionFormat)
    },
    {
      label: '其他数据提供格式',
      key: 'dataProvisionOtherFormat',
      visible: (record) => record?.dataProvisionFormat === '5'
    },
    {
      label: '数据存储方式',
      key: 'storageMethod',
      render: (record) =>
        getEnumLabel('storageMethodEnum', record?.storageMethod)
    },
    {
      label: '其他数据存储方式',
      key: 'storageOtherMethod',
      visible: (record) => record?.storageMethod === '7'
    },
    {
      label: '数据存储量(初始)',
      key: 'dataStorage'
    },
    {
      label: '更新频率',
      key: 'updateFrequency',
      render: (record) =>
        getEnumLabel('updateFrequencyEnum', record?.updateFrequency)
    },
    {
      label: '其他更新频率',
      key: 'updateOtherFrequency',
      visible: (record) => record?.updateFrequency === '11'
    },
    {
      label: '更新方式',
      key: 'updateMethod',
      render: (record) => getEnumLabel('updateMethodEnum', record?.updateMethod)
    },
    {
      label: '数据存储量(增长)',
      key: 'dataStorageIncrease'
    },
    {
      label: '是否包含敏感信息',
      key: 'sensitiveInformation',
      render: (record) =>
        getEnumLabel('whetherEnum', record?.sensitiveInformation)
    },
    {
      label: '涉及主体',
      key: 'sensitiveInvolvingSubject',
      visible: (record) => record?.sensitiveInformation === '1'
    },
    {
      label: '数据覆盖数量',
      key: 'sensitiveDataCoverageNumber',
      visible: (record) => record?.sensitiveInformation === '1'
    },
    {
      label: '是否脱敏',
      key: 'desensitizationSituation',
      visible: (record) => record?.sensitiveInformation === '1',
      render: (record) =>
        getEnumLabel('whetherEnum', record?.desensitizationSituation)
    },
    {
      label: '脱敏方式',
      key: 'desensitizationMethod',
      visible: (record) =>
        record?.sensitiveInformation === '1' &&
        record?.desensitizationSituation === '1',
      render: (record) =>
        getEnumLabel('desensitizationMethodEnum', record?.desensitizationMethod)
    },
    {
      label: '其他脱敏方式',
      key: 'desensitizationOtherMethod',
      visible: (record) =>
        record?.sensitiveInformation === '1' &&
        record?.desensitizationSituation === '1' &&
        record?.desensitizationMethod === '7'
    },
    {
      label: '存证方式',
      key: 'depositMethod',
      render: (record) =>
        getEnumLabel('depositMethodEnum', record?.depositMethod)
    },
    {
      label: '存证方式说明',
      key: 'depositDescription',
      span: 16
    },
    {
      label: '存证证明文件',
      key: 'depositProofDocument',
      span: 24,
      render: (record) => <FileView files={record?.depositProofDocument} />
    },
    {
      label: '存证数据存放路径',
      key: 'depositDataPath',
      span: 24
    }
  ],
  // 数据场景说明
  sceneData: [
    {
      label: '数据场景',
      key: 'ableScene',
      span: 24
    },
    {
      label: '禁用场景',
      key: 'disableScene',
      span: 24
    }
  ],
  // 共有数据信息
  sharedData: [
    {
      label: '是否共有数据',
      key: 'sharedData',
      render: (record) => getEnumLabel('whetherEnum', record?.sharedData)
    },
    {
      label: '共有数据信息',
      key: 'sharedDataList',
      span: 24,
      visible: (record) => record?.sharedData === '1',
      render: (record) => (
        <Table
          size='small'
          columns={sharedDataColumns}
          dataSource={record?.sharedDataList || []}
          rowKey={(_, index) => String(index)}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      )
    }
  ],
  // 数据共享开放信息
  openData: [
    {
      label: '共享类型',
      key: 'sharingType',
      render: (record) => getEnumLabel('sharingTypeEnum', record?.sharingType)
    },
    {
      label: '共享条件',
      key: 'sharingConditions',
      visible: (record) => record?.sharingType === '2'
    },
    {
      label: '共享方式',
      key: 'sharingMethod',
      render: (record) =>
        getEnumLabel('sharingMethodEnum', record?.sharingMethod?.split(','))
    },
    {
      label: '其他共享方式',
      key: 'sharingOtherMethod',
      visible: (record) => record?.sharingMethod?.includes('5')
    },
    {
      label: '是否向社会开放',
      key: 'socialOpenness',
      render: (record) => getEnumLabel('whetherEnum', record?.socialOpenness)
    },
    {
      label: '开放条件',
      key: 'opennessConditions',
      visible: (record) => record?.socialOpenness === '1'
    }
  ],
  // 数据目录信息
  direcData: [
    {
      label: '是否基于已有成果填报数据目录',
      key: 'basedDataDirectory',
      render: (record) =>
        getEnumLabel('basedDataDirectoryEnum', record?.basedDataDirectory)
    },
    {
      label: '上传数据字段项',
      key: 'demandFile',
      span: 24,
      render: (record) => <FileView files={record?.demandFile} />
    },
    {
      label: '样例数据',
      key: 'sampleData',
      span: 24,
      render: (record) => <FileView files={record?.sampleData} />
    }
  ],
  // 数据合规性来源及承诺
  sourceData: [
    {
      label: '数据合规性来源及承诺',
      key: 'dataSourceCommitment',
      span: 24,
      render: (record) => <FileView files={record?.dataSourceCommitment} />
    }
  ]
}

export default columns
