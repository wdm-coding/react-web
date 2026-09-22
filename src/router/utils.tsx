import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { RouterItem } from '@/router'
import LoginGuard from './Guard/LoginGuard'

const modules = import.meta.glob('@/pages/**/index.tsx')

const getElement = (
  item: RouterItem
): (() => Promise<{
  default: React.ComponentType
}>) => {
  if (!item.componentPath) {
    return null
  } else {
    switch (item.componentPath) {
      case 'ClientLayout':
        return () => import('@/layouts/ClientLayout')
      case 'ManageLayout':
        return () => import('@/layouts/ManageLayout')
      case 'Outlet':
        return () => import('@/layouts/components/OutletPage')
      default:
        const loader = modules[
          `/src/pages${item.componentPath}`
        ] as () => Promise<{
          default: React.ComponentType
        }>
        return loader
    }
  }
}

export const transformRoutes = (menuItems: RouterItem[]) => {
  return menuItems.map((item: RouterItem) => {
    const route: any = {
      path: item.path,
      name: item.name
    }
    if (item.componentPath) {
      if (!getElement(item)) {
        console.error(`组件路径 ${item.componentPath} 未找到`)
        return null
      }
      const Element = lazy(getElement(item))
      if (item.name === 'Login') {
        route.element = (
          <LoginGuard>
            <Element />
          </LoginGuard>
        )
      } else {
        route.element = <Element />
      }
    }
    if (item.children?.length) {
      route.children = [
        {
          index: true,
          element: <Navigate to={item.children[0].path} replace />
        },
        ...transformRoutes(item.children)
      ]
    }
    return route
  })
}
