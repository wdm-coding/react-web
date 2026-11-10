import Icon from '@/components/Icon'
const siderMenus = [
  {
    label: '首页',
    key: '/manage/manageHome',
    icon: 'svg-vite'
  },
  {
    label: '登记申请',
    key: '/manage/regApply',
    icon: 'AndroidOutlined',
    children: [ 
      {
        label: '登记数据申请',
        key: '/manage/regApply/regApplyList',
        icon: 'AppleOutlined'
      },
      {
        label: '登记数据查询',
        key: '/manage/regApply/regApplyData',
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
