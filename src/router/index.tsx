import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import { generateRouters } from './utils';

/** 使用useRoutes创建路由 */
const RouterConfig = () => {
  const routes = generateRouters();
  const element = useRoutes(routes);

  return element;
};

/** 根据目录结构生成路由 */
export const CreateRouter = () => {
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  );
};
