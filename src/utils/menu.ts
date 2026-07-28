type MenuItem = {
  path: string
  children?: MenuItem[]
  name: string
  [key: string]: any
}
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
        menuItem.children = formattedMenus(
          item.children,
          `${prefixPath}/${item.path}`
        )
      }
      return menuItem
    })
}
