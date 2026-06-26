type MenuItem = {
  path: string
  children?: MenuItem[]
  name: string
  [key: string]: any
}
export const formattedMenus = (menus: MenuItem[]) => {
  return menus
    .filter((item) => !item.index)
    .map((item) => {
      const menuItem: any = {
        label: item.name,
        key: item.path
      }
      if (item.children && item.children.length > 0) {
        menuItem.children = formattedMenus(item.children)
      }
      return menuItem
    })
}
