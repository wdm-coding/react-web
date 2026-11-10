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
  '/404',
  '/login',
  '/portal',
  '/portal/home',
  '/manage',
  '/manage/manageHome',
  '/manage/regApply',
  '/manage/regApply/regApplyList',
  '/manage/regApply/regApplyData',
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
    path: '/404',
    name: 'NotFound',
    componentPath: '/NotFound/index.tsx'
  }
]
