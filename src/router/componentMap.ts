export const componentMap: Record<string, () => Promise<any>> = {
  ClientHome: () => import('@/pages/Client/Home/index.tsx'),
  RegisterHome: () => import('@/pages/Client/RegisterHome/index.tsx'),
  dashboard: () => import('@/pages/Manage/Dashboard/index.tsx'),
  menuManage: () => import('@/pages/Manage/SystemManage/MenuManage/index.tsx'),
  userManage: () => import('@/pages/Manage/SystemManage/UserManage/index.tsx')
}
