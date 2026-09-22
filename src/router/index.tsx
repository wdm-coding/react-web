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
  '/client',
  '/client/home',
  '/client/registerHome',
  '/manage',
  '/manage/dashboard',
  '/manage/systemManage',
  '/manage/systemManage/menuManage',
  '/manage/systemManage/userManage'
]
export const list: RouterItem[] = [
  {
    path: '/client',
    name: 'Client',
    componentPath: 'ClientLayout',
    children: [
      {
        path: 'home',
        name: 'Home',
        componentPath: '/Client/Home/index.tsx',
        icon: 'home',
        title: '首页'
      },
      {
        path: 'registerHome',
        name: 'RegisterHome',
        componentPath: '/Client/RegisterHome/index.tsx',
        icon: 'register-home',
        title: '登记首页'
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
        path: 'dashboard',
        name: 'Dashboard',
        componentPath: '/Manage/Dashboard/index.tsx',
        icon: 'dashboard',
        title: '仪表盘'
      },
      {
        path: 'systemManage',
        name: 'SystemManage',
        componentPath: 'Outlet',
        icon: 'system-manage',
        title: '系统管理',
        children: [
          {
            path: 'menuManage',
            name: 'MenuManage',
            componentPath: '/Manage/SystemManage/MenuManage/index.tsx',
            icon: 'menu-manage',
            title: '菜单管理'
          },
          {
            path: 'userManage',
            name: 'UserManage',
            componentPath: '/Manage/SystemManage/UserManage/index.tsx',
            icon: 'user-manage',
            title: '用户管理'
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
