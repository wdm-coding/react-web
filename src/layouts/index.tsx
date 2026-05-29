import { useLoaderData, useRoutes, useLocation, Navigate } from 'react-router-dom';
import { getToken } from '@/utils/storage';
import { Suspense } from 'react';
import { useUserStore } from '@/store/userStore';
import ManageLayout from '@/layouts/ManageLayout';
import { formatRoutes } from '@/router/utils';
import { whitePath } from '@/router/whitePath';
// 权限守卫
const AuthGuard = ({ children }) => {
  const location = useLocation();
  const isLogin = !!getToken();
  // 去除参数
  const path = location.pathname.split('?')[0];
  if (!isLogin && !whitePath.includes(path)) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  return children;
};
function Layouts() {
  const menuTree = useUserStore((s) => s.menuTree);
  // 从 loader 拿到动态路由
  const routes = useLoaderData();
  // 静态路由 + 动态路由 合并
  const allRoutes = [...routes.staticRoutes];
  if (menuTree?.length > 0) {
    allRoutes.push({
      path: 'manage',
      element: <ManageLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={menuTree[0].path} replace />,
        },
        ...formatRoutes(menuTree),
      ],
    });
  }
  return (
    <Suspense fallback='加载中...'>
      <AuthGuard>{useRoutes(allRoutes)}</AuthGuard>
    </Suspense>
  );
}

export default Layouts;
