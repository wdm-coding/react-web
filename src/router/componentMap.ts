export const componentMap: Record<string, () => Promise<any>> = {
  dashboard: () => import('@/pages/Manage/Dashboard/index.tsx'),
  menuManage: () => import('@/pages/Manage/SystemManage/MenuManage/index.tsx'),
  userManage: () => import('@/pages/Manage/SystemManage/UserManage/index.tsx'),
};
