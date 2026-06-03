export interface MenuItem {
  id: string
  code: string
  name: string
  path: string
  icon?: string
  component?: string
  children?: MenuItem[]
}
