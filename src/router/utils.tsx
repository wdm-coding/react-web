import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { componentMap } from './componentMap';
export const formatRoutes = (routes: any[]) => {
  return routes.map((item) => {
    const route: any = {};
    route.path = item.path;
    if (item.children?.length) {
      route.children = [
        {
          index: true,
          element: <Navigate to={item.children[0].path} replace />,
        },
        ...formatRoutes(item.children),
      ];
    }
    if (item.component) {
      // 首字母转为小写
      const mapKey = item.code.charAt(0).toLowerCase() + item.code.slice(1);
      const Component = componentMap[mapKey];
      if (!Component) {
        route.element = <div>组件映射未找到: {mapKey}</div>;
      } else {
        const LazyComponent = lazy(Component);
        route.element = <LazyComponent />;
      }
    }
    return route;
  });
};
