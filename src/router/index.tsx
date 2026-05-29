import { createBrowserRouter, Navigate } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Layouts from '@/layouts';
import ClientLayout from '@/layouts/ClientLayout';
import { lazy } from 'react';
import LoginGuard from '@/router/LoginGuard';
const ClientHome = lazy(() => import(`@/pages/Client/Home/index.tsx`));
const ClientAbout = lazy(() => import(`@/pages/Client/About/index.tsx`));
const staticRoutes = [
  {
    index: true,
    element: <Navigate to='/client' replace />,
  },
  {
    path: 'client',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/client/home' replace />,
      },
      {
        path: 'home',
        element: <ClientHome />,
      },
      {
        path: 'about',
        element: <ClientAbout />,
      },
    ],
  },
];
// 组件懒加载
const rootLoader = async () => {
  return {
    staticRoutes,
  };
};
const routers = [
  {
    path: '/*',
    loader: rootLoader,
    element: <Layouts />,
  },
  {
    path: '/login',
    element: (
      <LoginGuard>
        <Login />
      </LoginGuard>
    ),
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to='/404' replace />,
  },
];
const router = createBrowserRouter(routers);
export default router;
