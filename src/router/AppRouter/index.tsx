import { useRoutes, Navigate } from 'react-router-dom'
import { Suspense, useMemo } from 'react'
import { transformRoutes } from '@/router/utils'
import { useUserStore } from '@/store/userStore'
import AuthGuard from '@/router/Guard/AuthGuard'
import { Spin } from 'antd'
import { App } from 'antd'
import { list } from '@/router'
const AppRouter = () => {
  const staticFunction = App.useApp()
  window.$message = staticFunction.message
  window.$notification = staticFunction.notification
  window.$modal = staticFunction.modal
  const menuTree = useUserStore((s) => s.menuTree)
  const routes = useMemo(() => {
    const appRoutes = transformRoutes(list)
    console.log('appRoutes', appRoutes)
    return [
      {
        index: true,
        element: <Navigate to='/client' replace />
      },
      ...appRoutes,
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
