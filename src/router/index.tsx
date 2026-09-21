import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import ClientLayout from '@/layouts/ClientLayout'
import LoginGuard from './LoginGuard'
const ClientHome = lazy(() => import('@/pages/Client/Home/index.tsx'))
const RegisterHome = lazy(() => import('@/pages/Client/RegisterHome/index.tsx'))
const Login = lazy(() => import('@/pages/Login/index.tsx'))
export const staticRoutes: any[] = [
  {
    index: true,
    element: <Navigate to='/client' replace />
  },
  {
    path: '/client',
    element: <ClientLayout />,
    children: [
      { index: true, element: <Navigate to='/client/home' replace /> },
      { path: 'home', element: <ClientHome />, name: '首页' },
      { path: 'registerHome', element: <RegisterHome />, name: '登记首页' }
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

export const whitePaths = [
  '/',
  '/login',
  '/client',
  '/client/home',
  '/client/registerHome'
]
