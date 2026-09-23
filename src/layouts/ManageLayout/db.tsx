import Icon from '@/components/Icon'
const siderMenus = [
  {
    label: '数据看板',
    key: '/manage/dashboard',
    icon: 'svg-vite'
  },
  {
    label: '系统管理',
    key: '/manage/systemManage',
    icon: 'AndroidOutlined',
    children: [
      {
        label: '用户管理',
        key: '/manage/systemManage/userManage',
        icon: 'AppleOutlined'
      },
      {
        label: '菜单管理',
        key: '/manage/systemManage/menuManage',
        icon: 'svg-react'
      }
    ]
  }
]

const transformItems = (menus: any[]) => {
  return menus.map((item: any) => {
    if (item.icon) {
      item.icon = <Icon name={item.icon} />
    }
    if (item.children) {
      item.children = transformItems(item.children)
    }
    return item
  })
}

export const siderMenusItems = transformItems(siderMenus)
