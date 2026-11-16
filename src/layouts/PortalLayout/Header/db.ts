export const navMenus = [
  {
    label: '首页',
    key: '/portal/home'
  },
  {
    label: '登记指南',
    key: '/portal/regGuide'
  },
  {
    label: '登记公示',
    key: '/portal/regPublic'
  },
  {
    label: '登记核验',
    key: '/portal/regCheck'
  },
  {
    label: '登记查询',
    key: '/portal/regQuery'
  },
  {
    label: '登记政策',
    key: '/portal/regPolicy'
  },
  {
    label: '登记机构',
    key: '/portal/regInstitution'
  },
  {
    label: '用数需求',
    key: '/portal/demandNumbers'
  },
  {
    label: '信息披露',
    key: '/portal/inforDisclosure'
  },
]

export const rightActions = [
  {
    label: '联系客服',
    key: 'contact',
    type: 'button',
    show: 'all'
  },
  {
    label: '用户手册',
    key: 'manual',
    type: 'button',
    show: 'all'
  },
  {
    label: '用户',
    key: 'userName',
    type: 'dropdown',
    show: 'login',
    items: [{ label: '退出登录', key: 'logout' }]
  },
  {
    label: '注册',
    key: 'register',
    type: 'dropdown',
    show: 'noLogin',
    items: [
      { label: '个人注册', key: 'personalRegister' },
      { label: '法人注册', key: 'legalRegister' }
    ]
  },
  {
    label: '登录',
    key: 'login',
    type: 'button',
    show: 'noLogin'
  }
]
