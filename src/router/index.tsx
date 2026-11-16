export interface RouterItem {
  path: string
  name: string
  redirect?: string
  componentPath?: string
  icon?: string
  title?: string
  children?: RouterItem[]
}
export const whitePaths = [
  '/',
  '/ssoLogin',
  '/404',
  '/login',
  '/portal',
  '/portal/home',
  '/portal/regPublic',
  '/portal/regCheck',
  '/portal/regQuery',
  '/portal/regPolicy',
  '/portal/regInstitution',
  '/portal/demandNumbers',
  '/portal/inforDisclosure',
  '/portal/regGuide',
]
export const list: RouterItem[] = [
  {
    path: '/portal',
    name: 'Portal',
    componentPath: 'PortalLayout',
    children: [
      {
        path: 'home',
        name: 'Home',
        componentPath: '/Portal/PortalHome/index.tsx',
        icon: 'home',
        title: '首页'
      },
      {
        path:'regGuide',
        name:'RegGuide',
        componentPath:'/Portal/RegGuide/index.tsx',
        icon:'reg-guide',
        title:'登记指南'
      },
      {
        path:'regPublic',
        name:'RegPublic',
        componentPath:'/Portal/RegPublic/index.tsx',
        icon:'reg-public',
        title:'登记公示'
      },
      {
        path:'regCheck',
        name:'RegCheck',
        componentPath:'/Portal/RegCheck/index.tsx',
        icon:'reg-check',
        title:'登记核验'
      },
      {
        path:'regQuery',
        name:'RegQuery',
        componentPath:'/Portal/RegQuery/index.tsx',
        icon:'reg-query',
        title:'登记查询'
      },
      {
        path:'regPolicy',
        name:'RegPolicy',
        componentPath:'/Portal/RegPolicy/index.tsx',
        icon:'reg-policy',
        title:'登记政策'
      },
      {
        path:'regInstitution',
        name:'RegInstitution',
        componentPath:'/Portal/RegInstitution/index.tsx',
        icon:'reg-apply',
        title:'登记机构'
      },
      {
        path:'demandNumbers',
        name:'DemandNumbers',
        componentPath:'/Portal/DemandNumbers/index.tsx',
        icon:'demand-numbers',
        title:'用数需求'
      },
      {
        path:'inforDisclosure',
        name:'InforDisclosure',
        componentPath:'/Portal/InforDisclosure/index.tsx',
        icon:'infor-disclosure',
        title:'信息披露'
      }
    ]
  },
  {
    path: '/manage',
    name: 'Manage',
    componentPath: 'ManageLayout',
    icon: 'manager',
    title: '控制台',
    children: [
      {
        path: 'manageHome',
        name: 'ManageHome',
        componentPath: '/Manage/ManageHome/index.tsx',
        icon: 'home',
        title: '首页'
      },
      {
        path: 'firstReg',
        name: 'FirstReg',
        componentPath: '/Manage/FirstReg/index.tsx',
        icon: 'first-reg',
        title: '首次登记'
      },
      {
        path: 'regApply',
        name: 'RegApply',
        componentPath: 'Outlet',
        icon: 'reg-apply',
        title: '登记申请',
        children: [
          {
            path: 'regApplyList',
            name: 'RegApplyList',
            componentPath: '/Manage/RegApply/RegApplyList/index.tsx',
            icon: 'reg-apply-list',
            title: '登记数据申请'
          },
          {
            path: 'regApplyData',
            name: 'RegApplyData',
            componentPath: '/Manage/RegApply/RegApplyData/index.tsx',
            icon: 'reg-apply-data',
            title: '登记数据查询'
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    componentPath: '/Login/index.tsx'
  },
  {
    path: '/ssoLogin',
    name: 'SsoLogin',
    componentPath: '/SsoLogin/index.tsx'
  },
  {
    path: '/404',
    name: 'NotFound',
    componentPath: '/NotFound/index.tsx'
  }
]
