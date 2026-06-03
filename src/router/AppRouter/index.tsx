import { useRoutes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { formatRoutes } from '@/router/utils'
import { useUserStore } from '@/store/userStore'
import NotFound from '@/pages/NotFound'
import ClientLayout from '@/layouts/ClientLayout'
import ManageLayout from '@/layouts/ManageLayout'
import LoginGuard from '@/router/LoginGuard'
import AuthGuard from '@/router/AuthGuard'

const ClientHome = lazy(() => import(`@/pages/Client/Home/index.tsx`))
const ClientAbout = lazy(() => import(`@/pages/Client/About/index.tsx`))
const Login = lazy(() => import(`@/pages/Login/index.tsx`))
const AppRouter = () => {
  const menuTree = useUserStore((s) => s.menuTree)
  const staticRoutes = [
    {
      index: true,
      element: <Navigate to='/client' replace />
    },
    {
      path: '/client',
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <Navigate to='/client/home' replace />
        },
        {
          path: 'home',
          element: <ClientHome />
        },
        {
          path: 'about',
          element: <ClientAbout />
        }
      ]
    },
    {
      path: '/login',
      element: (
        <LoginGuard>
          <Login />
        </LoginGuard>
      )
    }
  ]
  if (menuTree?.length) {
    staticRoutes.push({
      path: 'manage',
      element: <ManageLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={menuTree[0].path} replace />
        },
        ...formatRoutes(menuTree)
      ]
    })
  }
  const routes = useRoutes([
    ...staticRoutes,
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to='/404' replace /> }
  ])

  return (
    <Suspense fallback='加载中...'>
      <AuthGuard>{routes}</AuthGuard>
    </Suspense>
  )
}
export default AppRouter
