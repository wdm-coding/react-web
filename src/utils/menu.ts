type MenuItem = {
  path: string
  children?: MenuItem[]
  name: string
  [key: string]: any
}

// 格式化菜单，添加前缀路径
export const formattedMenus = (menus: MenuItem[], prefixPath = '/client') => {
  return menus
    .filter((item) => !item.index)
    .map((item) => {
      const menuItem: any = {
        label: item.name,
        key: `${prefixPath}/${item.path}`,
        path: `${prefixPath}/${item.path}`
      }
      if (item.children && item.children.length > 0) {
        menuItem.children = formattedMenus(item.children, `${prefixPath}/${item.path}`)
      }
      return menuItem
    })
}

// 格式化-面包屑菜单数据
export const formattedBreadcrumbs = (menus: MenuItem[]) => {
  return menus
    .filter((item) => !item.index)
    .map((item) => {
      const menuItem: any = {
        name: item.name,
        code: item.code,
        path: `${item.path}`
      }
      if (item.children && item.children.length > 0) {
        menuItem.children = formattedBreadcrumbs(item.children)
      }
      return menuItem
    })
}
