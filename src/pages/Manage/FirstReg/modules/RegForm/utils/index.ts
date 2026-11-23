import dayjs from 'dayjs'
import { uploadTransform } from '../config'
import { uuid } from '@/utils/common'

// 找出industryList数据中levelType为3的industryId
export const getIndustryIds = (industryList: any[]) => {
  let result = []
  industryList.forEach((item) => {
    if (item.levelType === 3) {
      result.push({
        label: item.name,
        value: item.industryId
      })
    }
    // 如果有子节点，继续递归查找
    if (item.children && item.children.length > 0) {
      result = result.concat(getIndustryIds(item.children))
    }
  })
  return result
}
// 回显登记数据名称
export const getRegistName = (industryList, coverageAreaList, name) => {
  const industryName = industryList?.[0]?.name || ''
  const coverageAreaName =
    coverageAreaList?.[0]?.map((item: any) => item.name).join('') || ''
  const dataRegistName = name.replace(
    `${coverageAreaName}-${industryName}-`,
    ''
  )
  return [coverageAreaName, industryName, dataRegistName]
}
// 回显日期范围
export const getDateRange = (start: string, end: string) => {
  if (!start || !end) {
    return []
  }
  return [start, end].map((item) => dayjs(item).format('YYYY-MM-DD'))
}

// 拆分存储量与单位，如 '111TB' -> { value: '111', unit: 'TB' }
export const splitStorageValue = (str?: string) => {
  const match = str?.match(/^([\d.]+)([A-Za-z]+)?$/)
  return {
    value: match?.[1] ?? str ?? '',
    unit: match?.[2] || undefined
  }
}

// 回显上传文件列表
export const setUploadFileList = (fileStr: string) => {
  const list = fileStr?.split(',').filter(Boolean) || []
  return list.map((item: any) => ({
    uid: new Date().getTime() + Math.random().toString(),
    name: item.split('/').pop(),
    path: item,
    status: 'done',
    url: item,
    response: item
  }))
}
// 回显被授权资源信息
export const setAuthOperatList = (authOperatList: any[]) => {
  console.log('回显时authOperatList', authOperatList)
  if (!authOperatList?.length) {
    return []
  }
  return authOperatList.map((item: any) => ({
    id: uuid(),
    dataRegistName2: item?.dataRegistName2 || '',
    dataRegistCode2: item?.dataRegistCode2 || '',
    authOperatTimeRange: getDateRange(
      item?.authOperatTimeStart2,
      item?.authOperatTimeEnd2
    )
  }))
}

// 转换日期范围
export const transformDateRange = (dateRange: string[]) => {
  if (dateRange?.length !== 2) {
    return ['', '']
  }
  return dateRange
}
// 转换dataRegistName
export const transformDataRegistName = (params: any) => {
  if (
    !params?.coverageAreaName ||
    !params?.industryName ||
    !params?.dataRegistName
  ) {
    return ''
  }
  return `${params?.coverageAreaName || ''}-${params?.industryName || ''}-${params?.dataRegistName || ''}`
}
// 设置authOperatList参数
export const getAuthOperatList = (authOperatList: any[]) => {
  console.log('保存时authOperatList', authOperatList)
  if (!authOperatList?.length) {
    return []
  }
  return authOperatList.map((item: any) => ({
    id: item?.id || '',
    dataRegistName2: item?.dataRegistName2 || '',
    dataRegistCode2: item?.dataRegistCode2 || '',
    authOperatTimeStart2: transformDateRange(item?.authOperatTimeRange)[0],
    authOperatTimeEnd2: transformDateRange(item?.authOperatTimeRange)[1]
  }))
}

// 回显表单数据
export const getFullFieldParams = (originData: any) => {
  const [coverageAreaName, industryName, dataRegistName] = getRegistName(
    originData?.industryList || [],
    originData?.coverageAreaList || [],
    originData?.dataRegistName || ''
  )
  // 数据基本信息
  const baseData = {
    coverageArea:
      originData?.coverageAreaList?.[0]?.map((item: any) => item.code) || [],
    orgArea: originData?.orgArea || '甘肃省大数据中心',
    industry: getIndustryIds(originData?.industryList || []),
    industryName,
    coverageAreaName,
    dataRegistName,
    dataRegistType: originData?.dataRegistType,
    dataCoverageTimeRange: getDateRange(
      originData?.dataCoverageTimeStart,
      originData?.dataCoverageTimeEnd
    ),
    authOperationStatus: originData?.authOperationStatus,
    authOperatEntityName: originData?.authOperatEntityName,
    authOperatEntityCode: originData?.authOperatEntityCode,
    authOperatTimeRange: getDateRange(
      originData?.authOperatTimeStart,
      originData?.authOperatTimeEnd
    ),
    infoSecurityAssessReport: setUploadFileList(
      originData?.infoSecurityAssessReport || ''
    ),
    dataType: originData?.dataType,
    dataContentIntroduction: originData?.dataContentIntroduction,
    dataLabel: originData?.dataLabel,
    dataProductAndServicesType: originData?.dataProductAndServicesType || '1',
    dataProductsAndServicesOtherType:
      originData?.dataProductsAndServicesOtherType,
    authResourceDevelop: originData?.authResourceDevelop || '1',
    authOperatList: setAuthOperatList(originData?.authOperatList || []),
    productAndServiceDetails: setUploadFileList(
      originData?.productAndServiceDetails || ''
    ),
    productUsage: originData?.productUsage || '1'
  }
  // 委托代理信息
  const proxyData = {
    entrustedAgent: originData?.entrustedAgent,
    entrustedAgentName: originData?.entrustedAgentName,
    entrustedAgentCode: originData?.entrustedAgentCode,
    entrustedAgentTime: getDateRange(
      originData?.entrustedAgentStartTime,
      originData?.entrustedAgentEndTime
    ),
    entrustedAgentAgree: setUploadFileList(
      originData?.entrustedAgentAgree || ''
    )
  }
  // 数据存储信息
  const storageData = {
    productionMethod: originData?.productionMethod,
    productionOtherMethod: originData?.productionOtherMethod,
    dataStructure: originData?.dataStructure,
    dataOtherStructure: originData?.dataOtherStructure,
    dataProvisionFormat: originData?.dataProvisionFormat,
    dataProvisionOtherFormat: originData?.dataProvisionOtherFormat,
    storageMethod: originData?.storageMethod,
    storageOtherMethod: originData?.storageOtherMethod,
    dataStorage: splitStorageValue(originData?.dataStorage)?.value || '',
    dataStorageUnit: splitStorageValue(originData?.dataStorage)?.unit || '',
    updateFrequency: originData?.updateFrequency,
    updateOtherFrequency: originData?.updateOtherFrequency,
    updateMethod: originData?.updateMethod,
    dataStorageIncrease:
      splitStorageValue(originData?.dataStorageIncrease)?.value || '',
    dataStorageIncreaseUnit:
      splitStorageValue(originData?.dataStorageIncrease)?.unit || '',
    sensitiveInformation: originData?.sensitiveInformation,
    sensitiveInvolvingSubject: originData?.sensitiveInvolvingSubject,
    sensitiveDataCoverageNumber: originData?.sensitiveDataCoverageNumber,
    desensitizationSituation: originData?.desensitizationSituation,
    desensitizationMethod: originData?.desensitizationMethod,
    desensitizationOtherMethod: originData?.desensitizationOtherMethod,
    depositMethod: originData?.depositMethod,
    certificationDescription: originData?.depositDescription,
    depositProofDocument: setUploadFileList(
      originData?.depositProofDocument || ''
    ),
    depositDataPath: originData?.depositDataPath
  }
  // 数据场景说明
  const sceneData = {
    ableScene: originData?.ableScene,
    disableScene: originData?.disableScene
  }
  // 数据共享开放信息
  const openData = {
    sharingType: originData?.sharingType,
    sharingConditions: originData?.sharingConditions,
    // 接口返回逗号分隔字符串，如 '3,4,5'，表单为多选需转数组
    sharingMethod: originData?.sharingMethod
      ? originData.sharingMethod.split(',')
      : [],
    sharingOtherMethod: originData?.sharingOtherMethod,
    socialOpenness: originData?.socialOpenness,
    opennessConditions: originData?.opennessConditions
  }
  // 共有数据信息
  const shareData = {
    sharedData: originData?.sharedData,
    // 表格 rowKey 为 id，接口返回数据无 id，回显时补充
    sharedDataList:
      originData?.sharedDataList?.map((item: any) => ({
        id: uuid(),
        sharedInstitutionName: item?.sharedInstitutionName,
        sharedInstitutionCode: item?.sharedInstitutionCode,
        sharedInstitutionType: item?.sharedInstitutionType,
        sharedInstitutionAddress: item?.sharedInstitutionAddress,
        sharedInstitutionAuthorization: setUploadFileList(
          item?.sharedInstitutionAuthorization || ''
        )
      })) || []
  }
  // 数据目录信息
  const direcData = {
    basedDataDirectory: originData?.basedDataDirectory,
    demandFile: setUploadFileList(originData?.demandFile || ''),
    sampleData: setUploadFileList(originData?.sampleData || '')
  }
  // 数据合规性来源及承诺
  const dataSource = {
    dataSourceCommitment: setUploadFileList(
      originData?.dataSourceCommitment || ''
    )
  }
  return {
    ...baseData,
    ...proxyData,
    ...storageData,
    ...sceneData,
    ...openData,
    ...shareData,
    ...direcData,
    ...dataSource
  }
}
// 提交时转换字段
export const submitTransform = (params: any, draft: boolean) => {
  console.log('submitTransform', params)
  const baseData: any = {
    draft,
    registerSubjectId: params?.registerSubjectId || '', // 登记主体ID
    dataRegistCode: params?.dataRegistCode || '', // 登记数据代码
    coverageArea: params.coverageArea
      ? [JSON.stringify(params.coverageArea || '')]
      : [], // 数据覆盖区域
    orgArea: params?.orgArea || '兰州市大数据中心', // 登记机构
    industry: params?.industry?.map((item: any) => item?.value || '') || [], // 行业类型
    industryList: [
      {
        name: '煤炭开采和洗选业',
        industryId: '06',
        levelType: 1,
        parentId: 'B',
        children: [
          {
            name: '烟煤和无烟煤开采洗选',
            industryId: '061',
            levelType: 2,
            parentId: '06',
            children: [
              {
                name: '烟煤和无烟煤开采洗选',
                industryId: '0610',
                levelType: 3,
                parentId: '061'
              }
            ]
          }
        ]
      }
    ], // 行业分类
    dataRegistName: transformDataRegistName(params), // 登记数据名称
    dataRegistType: params?.dataRegistType || '', // 登记数据类型
    dataProductAndServicesType: params?.dataProductAndServicesType, // 公共数据产品和服务类型
    dataProductsAndServicesOtherType:
      params?.dataProductsAndServicesOtherType || '', // 公共数据产品和服务其他类型
    authResourceDevelop: params?.authResourceDevelop, // 是否基于被授权资源开发
    authOperatList: getAuthOperatList(params?.authOperatList) || [], // 被授权资源信息
    productAndServiceDetails: uploadTransform(
      params?.productAndServiceDetails || ''
    ), // 产品和服务详情
    dataCoverageTimeStart: transformDateRange(
      params?.dataCoverageTimeRange || []
    )[0], // 数据覆盖时间起
    dataCoverageTimeEnd: transformDateRange(
      params?.dataCoverageTimeRange || []
    )[1], // 数据覆盖时间止
    authOperationStatus: params?.authOperationStatus || '', // 授权运营情况
    authOperatEntityName: params?.authOperatEntityName || '', // 运营机构名称
    authOperatEntityCode: params?.authOperatEntityCode || '', // 运营机构代码
    authOperatTimeStart: transformDateRange(
      params?.authOperatTimeRange || []
    )[0], // 授权运营时间起
    authOperatTimeEnd: transformDateRange(params?.authOperatTimeRange || [])[1], // 授权运营时间止
    infoSecurityAssessReport: uploadTransform(params.infoSecurityAssessReport), // 数据安全风险评估报告
    dataType: params?.dataType || '', // 数据分类
    dataContentIntroduction: params?.dataContentIntroduction || '', // 数据内容简介
    dataLabel: params?.dataLabel || '' // 数据标签
  }
  if (params?.dataRegistId) {
    baseData.dataRegistId = params?.dataRegistId
  }
  return {
    ...baseData,
    sharingMethod: '' // 数据共享方式
  }
}
