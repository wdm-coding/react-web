import { useRoutes, Navigate } from 'react-router-dom'
import { Suspense, useMemo } from 'react'
import { formatRoutes } from '@/router/utils'
import { useUserStore } from '@/store/userStore'
import { staticRoutes } from '@/router'
import AuthGuard from '@/router/AuthGuard'
import NotFound from '@/pages/NotFound'
import ManageLayout from '@/layouts/ManageLayout'
import { Spin } from 'antd'
const AppRouter = () => {
  const menuTree = useUserStore((s) => s.menuTree)
  const routes = useMemo(() => {
    const dynamicRoutes = []
    if (menuTree && menuTree.length > 0) {
      const formattedRoutes = formatRoutes(menuTree)
      if (formattedRoutes.length > 0) {
        dynamicRoutes.push({
          path: 'manage',
          element: <ManageLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={menuTree[0].path} replace />
            },
            ...formattedRoutes
          ]
        })
      }
    }
    return [
      ...staticRoutes,
      ...dynamicRoutes,
      { path: '/404', element: <NotFound /> },
      { path: '*', element: <Navigate to='/404' replace /> }
    ]
  }, [menuTree])
  const element = useRoutes(routes)

  return (
    <Suspense fallback={<Fallback />}>
      <AuthGuard>{element}</AuthGuard>
    </Suspense>
  )
}
const Fallback = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <Spin size='large' />
    </div>
  )
}
export default AppRouter
