import dayjs from 'dayjs'
import { uuid } from '@/utils/common'
import { downloadFile as downloadFileUtils } from '@/utils/files'
import regApplyApi from '@/api/regApply'
// 日期范围格式化
export const dateRangeFormat = (value: any[]) =>
  value?.map((item) => item?.format('YYYY-MM-DD')) || []

// 下载文件
export const downloadFile = downloadFileUtils
// 模板文件字段枚举
const templateFilekeyName = [
  'productAndServiceDetails', // 产品和服务详情
  'infoSecurityAssessReport', // 数据安全评估报告
  'entrustedAgentAgree', // 委托代理协议书
  'depositProofDocument', // 存证证明文件
  'demandFile2017', // 2017年上传数据字段项
  'demandFile2022', // 2022年上传数据字段项
  'demandFile', // 不基于上传数据字段项
  'sampleData', // 样例数据
  'dataSourceCommitment' // 数据合规性来源及承诺
]

// 设置表单中模板文件
export const templateFileExtract = (list: any[]) => {
  const templateFileList =
    list
      ?.filter((item) => templateFilekeyName?.includes(item?.keyName))
      .map((item) => ({
        ...item,
        fileName: item?.value?.split('/').pop() || ''
      })) || []
  const result = Object.fromEntries(
    templateFileList.map((item) => [item.keyName, item])
  )
  return result
}

// 设置上传文件参数-转换为字符串
export const uploadTransform = (value: any[]) => {
  if (!value?.length) {
    return ''
  }
  return value?.map((item) => item.response).join(',') || ''
}

// 输入性文本去空格
export const normalizeText = (value: string) => value.replace(/\s/g, '')

// 找出industryList数据中levelType为3的行业,并返回label和value
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
    uid: uuid(),
    name: item.split('/').pop(),
    path: item,
    status: 'done',
    url: item,
    response: item
  }))
}

// 回显被授权资源信息
export const setAuthOperatList = (authOperatList: any[]) => {
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

// 设置日期范围提交参数
export const transformDateRange = (dateRange: string[]) => {
  if (dateRange?.length !== 2) {
    return ['', '']
  }
  return dateRange
}

// 设置dataRegistName提交参数
export const transformDataRegistName = (params: any) => {
  if (!params?.coverageAreaName || !params?.industryName || !params?.dataName) {
    return ''
  }
  return `${params?.coverageAreaName || ''}-${params?.industryName || ''}-${params?.dataName || ''}`
}

// 设置authOperatList提交参数
export const getAuthOperatList = (authOperatList: any[]) => {
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
export const getFullFieldParams = (originData: any, regApproType: string) => {
  // 获取行业名称、区域名称 、登记数据名称
  const [coverageAreaName, industryName, dataName] = getRegistName(
    originData?.industryList || [],
    originData?.coverageAreaList || [],
    originData?.dataRegistName || ''
  )
  // 数据基本信息
  const baseData = {
    coverageArea:
      originData?.coverageAreaList?.[0]?.map((item: any) => item.code) || [],
    orgArea: originData?.orgArea,
    industry: getIndustryIds(originData?.industryList || []),
    industryName,
    coverageAreaName,
    dataRegistName: originData?.dataRegistName || '',
    dataName,
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
    entrustedAgent: originData?.entrustedAgent || '1',
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
    depositDescription: originData?.depositDescription,
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
    sharingType: originData?.sharingType || '1',
    sharingConditions: originData?.sharingConditions || '',
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
    basedDataDirectory: originData?.basedDataDirectory || '1',
    demandFile: setUploadFileList(originData?.demandFile || ''),
    sampleData: setUploadFileList(originData?.sampleData || '')
  }
  // 数据合规性来源及承诺
  const dataSource = {
    dataSourceCommitment: setUploadFileList(
      originData?.dataSourceCommitment || ''
    )
  }
  // 变更/更正/注销/续展信息·
  let changeData = {}
  if (regApproType === '2' || regApproType === '3') {
    changeData = {
      supplement: originData?.supplement || '',
      proofMaterials: setUploadFileList(originData?.proofMaterials || ''),
      applyForProof: setUploadFileList(originData?.applyForProof || ''),
      ...(originData?.otherProofMaterials
        ? {
            otherProofMaterials: setUploadFileList(
              originData?.otherProofMaterials || ''
            )
          }
        : {})
    }
  }
  console.log('changeData', originData?.regApproType, changeData)
  return {
    ...baseData,
    ...proxyData,
    ...storageData,
    ...sceneData,
    ...openData,
    ...shareData,
    ...direcData,
    ...dataSource,
    ...changeData
  }
}

// 提交时转换字段
export const submitTransform = (params: any, draft: boolean) => {
  console.log('submitTransform', params)
  // 基础数据
  const baseData: any = {
    draft,
    registerSubjectId: params?.registerSubjectId || null, // 登记主体ID
    dataRegistCode: params?.dataRegistCode || null, // 登记数据代码
    coverageArea: params.coverageArea
      ? [JSON.stringify(params.coverageArea || '')]
      : [], // 数据覆盖区域
    orgArea: params?.orgArea || null, // 登记机构
    industry: params?.industry?.map((item: any) => item?.value || '') || null, // 行业类型
    industryList: params?.industryList || null, // 行业分类
    dataRegistName: transformDataRegistName(params), // 登记数据名称
    dataRegistType: params?.dataRegistType || null, // 登记数据类型
    dataProductAndServicesType: params?.dataProductAndServicesType || null, // 公共数据产品和服务类型
    dataProductsAndServicesOtherType:
      params?.dataProductsAndServicesOtherType || null, // 公共数据产品和服务其他类型
    authResourceDevelop: params?.authResourceDevelop || null, // 是否基于被授权资源开发
    authOperatList: getAuthOperatList(params?.authOperatList) || null, // 被授权资源信息
    productAndServiceDetails:
      uploadTransform(params?.productAndServiceDetails || '') || null, // 产品和服务详情
    dataCoverageTimeStart:
      transformDateRange(params?.dataCoverageTimeRange || [])[0] || null, // 数据覆盖时间起
    dataCoverageTimeEnd:
      transformDateRange(params?.dataCoverageTimeRange || [])[1] || null, // 数据覆盖时间止
    authOperationStatus: params?.authOperationStatus || null, // 授权运营情况
    authOperatEntityName: params?.authOperatEntityName || null, // 运营机构名称
    authOperatEntityCode: params?.authOperatEntityCode || null, // 运营机构代码
    authOperatTimeStart:
      transformDateRange(params?.authOperatTimeRange || [])[0] || null, // 授权运营时间起
    authOperatTimeEnd:
      transformDateRange(params?.authOperatTimeRange || [])[1] || null, // 授权运营时间止
    infoSecurityAssessReport:
      uploadTransform(params.infoSecurityAssessReport) || null, // 数据安全风险评估报告
    dataType: params?.dataType || null, // 数据分类
    dataContentIntroduction: params?.dataContentIntroduction || null, // 数据内容简介
    dataLabel: params?.dataLabel || null // 数据标签
  }
  // 代理数据
  const proxyData = {
    entrustedAgent: params?.entrustedAgent || null,
    entrustedAgentName: params?.entrustedAgentName || null,
    entrustedAgentCode: params?.entrustedAgentCode || null,
    entrustedAgentStartTime:
      transformDateRange(params?.entrustedAgentTime || [])[0] || null,
    entrustedAgentEndTime:
      transformDateRange(params?.entrustedAgentTime || [])[1] || null,
    entrustedAgentAgree:
      uploadTransform(params?.entrustedAgentAgree || '') || null
  }
  // 存储数据
  const storageData = {
    productionMethod: params?.productionMethod || null,
    productionOtherMethod: params?.productionOtherMethod || null,
    dataStructure: params?.dataStructure || null,
    dataOtherStructure: params?.dataOtherStructure || null,
    dataProvisionFormat: params?.dataProvisionFormat || null,
    dataProvisionOtherFormat: params?.dataProvisionOtherFormat || null,
    storageMethod: params?.storageMethod || null,
    storageOtherMethod: params?.storageOtherMethod || null,
    dataStorage:
      `${params?.dataStorage || ''}${params?.dataStorageUnit || ''}` || null,
    updateFrequency: params?.updateFrequency || null,
    updateOtherFrequency: params?.updateOtherFrequency || null,
    updateMethod: params?.updateMethod || null,
    dataStorageIncrease:
      `${params?.dataStorageIncrease || ''}${params?.dataStorageIncreaseUnit || ''}` ||
      null,
    sensitiveInformation: params?.sensitiveInformation || null,
    sensitiveInvolvingSubject: params?.sensitiveInvolvingSubject || null,
    sensitiveDataCoverageNumber: params?.sensitiveDataCoverageNumber || null,
    desensitizationSituation: params?.desensitizationSituation || null,
    desensitizationMethod: params?.desensitizationMethod || null,
    desensitizationOtherMethod: params?.desensitizationOtherMethod || null,
    depositMethod: params?.depositMethod || null,
    depositDescription: params?.depositDescription || null,
    depositProofDocument:
      uploadTransform(params?.depositProofDocument || '') || null,
    depositDataPath: params?.depositDataPath || null
  }
  // 数据场景说明
  const sceneData = {
    ableScene: params?.ableScene || null,
    disableScene: params?.disableScene || null
  }
  // 数据共享开放信息
  const openData = {
    sharingType: params?.sharingType || null,
    sharingConditions: params?.sharingConditions || null,
    // 接口返回逗号分隔字符串，如 '3,4,5'，表单为多选需转数组
    sharingMethod: params?.sharingMethod?.join(',') || null,
    sharingOtherMethod: params?.sharingOtherMethod || null,
    socialOpenness: params?.socialOpenness || null,
    opennessConditions: params?.opennessConditions || null
  }
  // 共用数据信息
  const shareData = {
    sharedData: params?.sharedData || null,
    // 表格 rowKey 为 id，接口返回数据无 id，回显时补充
    sharedDataList:
      params?.sharedDataList?.map((item: any) => ({
        id: item?.id || uuid(),
        sharedInstitutionName: item?.sharedInstitutionName,
        sharedInstitutionCode: item?.sharedInstitutionCode,
        sharedInstitutionType: item?.sharedInstitutionType,
        sharedInstitutionAddress: item?.sharedInstitutionAddress,
        sharedInstitutionAuthorization: uploadTransform(
          item?.sharedInstitutionAuthorization || ''
        )
      })) || null
  }
  // 数据目录信息
  const direcData = {
    basedDataDirectory: params?.basedDataDirectory || null,
    demandFile: uploadTransform(params?.demandFile || '') || null,
    sampleData: uploadTransform(params?.sampleData || null)
  }
  // 数据合规性来源及承诺
  const dataSource = {
    dataSourceCommitment:
      uploadTransform(params?.dataSourceCommitment || '') || null
  }

  // 变更数据信息
  const changeData = {
    orgDataRegistId: params?.orgDataRegistId || null,
    orgDataRegistName: transformDataRegistName(params), // 登记数据名称,
    supplement: params?.supplement || null,
    proofMaterials: uploadTransform(params?.proofMaterials || '') || null,
    applyForProof: uploadTransform(params?.applyForProof || '') || null,
    ...(params?.otherProofMaterials
      ? {
          otherProofMaterials:
            uploadTransform(params?.otherProofMaterials || '') || null
        }
      : {})
  }
  // 汇总数据
  const submitData = {
    ...baseData,
    ...proxyData,
    ...storageData,
    ...sceneData,
    ...openData,
    ...shareData,
    ...direcData,
    ...dataSource,
    ...changeData
  }
  if (params?.dataRegistId) {
    submitData.dataRegistId = params?.dataRegistId
  }
  // 处理空值
  Object.keys(submitData).forEach((key) => {
    if (submitData[key] === null) {
      delete submitData[key]
    }
    if (submitData[key]?.length === 0) {
      delete submitData[key]
    }
  })
  return { ...submitData, sharingMethod: submitData?.sharingMethod || '' }
}

// 获取数据提交接口
export const getSubmitApi = (regApproType: string) => {
  switch (regApproType) {
    case '1':
      return {
        api: regApplyApi.firstRegApplySubmit,
        afterPath: '/manage/regApply/regApplyList'
      }
    case '2':
      return {
        api: regApplyApi.changeRegApply,
        afterPath: '/manage/regApply/regApplyList'
      }
    case '3':
      return {
        api: regApplyApi.correctRegApply,
        afterPath: '/manage/regApply/regApplyList'
      }
    case '4':
      return {
        api: regApplyApi.logoutRegApply,
        afterPath: '/manage/login'
      }
    case '5':
      return {
        api: regApplyApi.continueRegApply,
        afterPath: '/manage/regApply/regApplyList'
      }
    default:
      return {
        api: regApplyApi.firstRegApplySubmit,
        afterPath: '/manage/regApply/regApplyList'
      }
  }
}
