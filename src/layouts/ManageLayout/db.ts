export const siderMenus = [
  {
    label: '数据看板',
    key: '/manage/dashboard'
  },
  {
    label: '系统管理',
    key: '/manage/systemManage',
    children: [
      {
        label: '用户管理',
        key: '/manage/systemManage/userManage'
      },
      {
        label: '菜单管理',
        key: '/manage/systemManage/menuManage'
      }
    ]
  }
]
