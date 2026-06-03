import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import ClientLayout from '@/layouts/ClientLayout'
import LoginGuard from './LoginGuard'
const ClientHome = lazy(() => import('@/pages/Client/Home/index.tsx'))
const ClientAbout = lazy(() => import('@/pages/Client/About/index.tsx'))
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
      { path: 'home', element: <ClientHome /> },
      { path: 'about', element: <ClientAbout /> }
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

export const whitePaths = ['/', '/login', '/client', '/client/home']
