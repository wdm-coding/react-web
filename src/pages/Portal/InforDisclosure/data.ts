/** 服务接口域名 */
export const DOMAIN = 'gansu-ndi.com'

/** 类型筛选口径：按业务功能域划分 6 大类 */
export const CATS = [
  '身份认证',
  '主体与节点管理',
  '数据资源',
  '数据产品',
  '目录与查询',
  '运行监测'
] as const

/** 服务接口条目 */
export interface ServiceItem {
  code: string
  name: string
  cat: string
  path: string
  method: string
  status: 'online'
  version: string
  callers: string
  desc: string
}

/** 服务接口数据（路径 / 调用方式依据《3-区域功能节点接口》文档，版本统一 v1.0） */
export const services: ServiceItem[] = [
  {
    code: 'identityVerify',
    name: '身份验证（挑战）',
    cat: '身份认证',
    path: '/identityVerify',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '区域/行业节点、业务节点、接入连接器',
    desc: '实现对接入主体账号和密码、业务节点身份的校验（节点标识相匹配），下发挑战值。'
  },
  {
    code: 'identityVerifyNonce',
    name: '身份验证（应答）',
    cat: '身份认证',
    path: '/identityVerifyNonce',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '区域/行业节点、业务节点、接入连接器',
    desc: '基于挑战应答机制完成身份验证：调用方对平台下发的挑战值签名后提交应答，验证通过即确认身份。'
  },
  {
    code: 'getIdentityCredential',
    name: '获取可信身份凭证',
    cat: '身份认证',
    path: '/getIdentityCredential',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体',
    desc: '业务节点可通过调用本接口获取接入主体及接入连接器的身份凭证；亦可通过通用接口代替接入主体获取其身份凭证。'
  },
  {
    code: 'GetEnterpriseInfo',
    name: '接入主体身份信息查询',
    cat: '身份认证',
    path: '/GetEnterpriseInfo',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '业务节点可调用本接口查询指定接入主体的身份基本信息。'
  },
  {
    code: 'GetIdentityProviderList',
    name: '可信身份凭证提供方类型查询',
    cat: '身份认证',
    path: '/GetIdentityProviderList',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '调用方可调用本接口查询已注册的区域/行业节点支持的第三方可信凭证提供方类型列表数据。'
  },
  {
    code: 'getIdentityStatus',
    name: '身份状态查询',
    cat: '身份认证',
    path: '/getIdentityStatus',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '查询身份状态以及证书状态。'
  },
  {
    code: 'getRegionCert',
    name: '获取区域证书',
    cat: '身份认证',
    path: '/getRegionCert',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '查询当前区域/行业功能节点的证书，该接口无需鉴权。'
  },
  {
    code: 'enterpriseRegistry',
    name: '接入主体注册',
    cat: '主体与节点管理',
    path: '/enterpriseRegistry',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '业务节点可调用本接口代替用户进行接入主体身份验证和密钥共识算法标识的申请。'
  },
  {
    code: 'enterpriseUpdate',
    name: '接入主体更新',
    cat: '主体与节点管理',
    path: '/enterpriseUpdate',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '实现接入主体身份信息更新。'
  },
  {
    code: 'enterpriseClose',
    name: '接入主体注销',
    cat: '主体与节点管理',
    path: '/enterpriseClose',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '实现接入主体身份注销。'
  },
  {
    code: 'connectorRegistry',
    name: '接入连接器注册',
    cat: '主体与节点管理',
    path: '/connectorRegistry',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '业务节点可调用本接口代替接入连接器进行身份注册及密钥共识算法标识申请（接入连接器配置后调用）。'
  },
  {
    code: 'connectorUpdate',
    name: '接入连接器更新',
    cat: '主体与节点管理',
    path: '/connectorUpdate',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '实现接入连接器身份信息更新。'
  },
  {
    code: 'connectorClose',
    name: '接入连接器注销',
    cat: '主体与节点管理',
    path: '/connectorClose',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '实现接入连接器身份注销。'
  },
  {
    code: 'serviceNodeRegistry',
    name: '业务节点登记',
    cat: '主体与节点管理',
    path: '/serviceNodeRegistry',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '接入主体',
    desc: '接入主体可调用本接口进行业务节点的身份注册，并通过区域/行业标识申请身份凭证。'
  },
  {
    code: 'serviceNodeUpdate',
    name: '业务节点更新',
    cat: '主体与节点管理',
    path: '/serviceNodeUpdate',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '接入主体',
    desc: '实现业务节点身份信息更新。'
  },
  {
    code: 'serviceNodeClose',
    name: '业务节点注销',
    cat: '主体与节点管理',
    path: '/serviceNodeClose',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '接入主体',
    desc: '实现业务节点身份注销。'
  },
  {
    code: 'dataResourceRegistry',
    name: '数据资源登记',
    cat: '数据资源',
    path: '/dataResourceRegistry',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体、接入连接器',
    desc: '调用方可调用本接口进行数据资源登记，包括数据资源基本信息与标识。'
  },
  {
    code: 'dataResourceUpdate',
    name: '数据资源登记变更',
    cat: '数据资源',
    path: '/dataResourceUpdate',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体、接入连接器',
    desc: '实现数据资源登记信息的更新。'
  },
  {
    code: 'dataResourceClose',
    name: '数据资源登记注销',
    cat: '数据资源',
    path: '/dataResourceClose',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体、接入连接器',
    desc: '实现已登记数据资源的注销操作。'
  },
  {
    code: 'dataProductInfoRegistry',
    name: '数据产品登记',
    cat: '数据产品',
    path: '/dataProductInfoRegistry',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体、接入连接器',
    desc: '调用方可调用本接口进行数据产品登记，登记审核通过后获取数据产品标识。'
  },
  {
    code: 'dataProductInfoUpdate',
    name: '数据产品登记变更',
    cat: '数据产品',
    path: '/dataProductInfoUpdate',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体、接入连接器',
    desc: '实现数据产品登记信息的更新。'
  },
  {
    code: 'dataProductInfoClose',
    name: '数据产品注销',
    cat: '数据产品',
    path: '/dataProductInfoClose',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入主体、接入连接器',
    desc: '实现已登记数据产品的注销。'
  },
  {
    code: 'dataProductPublish',
    name: '数据产品上架',
    cat: '数据产品',
    path: '/dataProductPublish',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '业务节点可调用本接口将业务节点下接入连接器的数据产品上架信息上架至数据交易中心。'
  },
  {
    code: 'dataUpProductUpdate',
    name: '数据产品上架变更',
    cat: '数据产品',
    path: '/dataUpProductUpdate',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '业务节点可调用本接口对已上架数据产品信息进行更新，数据更新后同步至区域功能节点。'
  },
  {
    code: 'dataUpProductClose',
    name: '数据产品下架',
    cat: '数据产品',
    path: '/dataUpProductClose',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点',
    desc: '业务节点调用本接口实现业务节点下的数据产品在区域功能节点完成注册下架。'
  },
  {
    code: 'infoReport',
    name: '节点运行监测和业务数据上报',
    cat: '运行监测',
    path: '/infoReport',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '调用方向区域功能节点上报节点运行状态、业务指标等监测数据，按照特定规则上报，实现事项可查、事项可控。'
  },
  {
    code: 'dataCatalogQuery',
    name: '数据目录查询',
    cat: '目录与查询',
    path: '/dataCatalogQuery',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '业务节点调用本接口进行区域数据目录查询。'
  },
  {
    code: 'regionSyncListQuery',
    name: '业务节点目录查询',
    cat: '目录与查询',
    path: '/regionSyncListQuery',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '业务节点调用本接口进行行业/区域节点目录查询。'
  },
  {
    code: 'formStatusQuery',
    name: '表单状态查询',
    cat: '目录与查询',
    path: '/formStatusQuery',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '业务节点调用本接口查询向区域节点提交的表单业务办理的审批状态信息；接入适配器调用本接口查询上报业务事项的审批状态信息。'
  },
  {
    code: 'regionNodeResolution',
    name: '标识解析',
    cat: '目录与查询',
    path: '/regionNodeResolution',
    method: 'POST',
    status: 'online',
    version: 'v1.0',
    callers: '业务节点、接入连接器',
    desc: '调用方携带数据查询标识码、数据产品标识识别码、接入注册标识识别码、业务事项标识识别码（需符合 GB 32100 规范）调用节点标识解析，获取对应企业/产品相关信息。'
  }
]
