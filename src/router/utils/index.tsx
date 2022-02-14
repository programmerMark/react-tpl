import React from 'react';

import { IRoute } from './interface';

/**
 * 返回格式化后的路由路径
 * @param path 被格式化的路由路径
 * @return
 */
export const formatPath = (path: string) => {
  return path.replace('../../pages', '').replace('/index.tsx', '').replace(/_/g, ':');
};

/**
 * 返回格式化后的路由列表
 * @param routes 被格式化的路由列表
 * @returns
 */
export const formatRoute = (routes: IRoute[]): IRoute[] => {
  let formattedRoutes: IRoute[] = routes.map((route) => {
    const splitArr = route.path.split('/children');
    const lastPath = splitArr[splitArr.length - 1];
    const penultPath = splitArr[splitArr.length - 2];
    return {
      path: lastPath.replace(/\/pages/g, ''),
      parentPath: (penultPath || '').replace(/\/pages/g, ''),
      element: route.element,
      children: [],
    };
  });
  formattedRoutes = formattedRoutes.map((item) => ({
    ...item,
    path: item.path.slice(1),
    parentPath: item.parentPath?.slice(1),
  }));
  formattedRoutes = formattedRoutes
    .map((item) => {
      const children = recursionRoutes(item.path, formattedRoutes);
      return {
        ...item,
        children,
      };
    })
    .filter((item) => !item.parentPath);
  /** 存在404目录时，使用404匹配所有未找到的路由 */
  const findResult = formattedRoutes.find((route) => route.path === '404');
  if (findResult) {
    formattedRoutes.push({
      path: '*',
      element: findResult.element,
      children: [],
    });
  }
  return formattedRoutes;
};

/**
 * 返回路由列表中当前路径的子路由列表
 * @param path 当前路由路径
 * @param routes 路由对象列表
 * @returns
 */
const recursionRoutes = (path: string, routes: IRoute[]) => {
  let children = findChildrenByPath(path, routes);
  if (children.length <= 0) {
    return [];
  } else {
    children.forEach((item) => {
      const result = recursionRoutes(item.path, routes);
      if (result.length > 0) {
        item.children = result;
      }
    });
  }
  return children;
};

/**
 * 返回路由列表中当前路径的子路由列表
 * @param path 当前路由路径
 * @param routes 路由对象列表
 * @returns
 */
const findChildrenByPath = (path: string, routes: IRoute[]) => {
  let children: IRoute[] = [];
  routes.forEach((route) => {
    if (route.parentPath === path) {
      children.push({
        path: route.path,
        element: route.element,
        children: route.children,
      });
    }
  });
  return children;
};

/** 生成路由配置数组 */
export const generateRouters = () => {
  const routes = import.meta.globEager('../../pages/**/index.tsx');
  if (Object.keys(routes).length === 0) {
    return [];
  }
  let formatedRoutes: IRoute[] = [];
  let appRoute: IRoute | null = null;
  for (const key in routes) {
    const path = formatPath(key);
    // eslint-disable-next-line no-undef
    const Element = routes[key].default as () => JSX.Element;
    if (path === '/app') {
      appRoute = {
        path: '/',
        element: <Element />,
        children: [],
      };
    } else {
      formatedRoutes.push({
        path,
        element: <Element />,
        children: [],
      });
    }
  }
  formatedRoutes = formatRoute(formatedRoutes);
  /** 根目录下有名为app的目录，则其他目录都作为app的子路由 */
  if (appRoute !== null) {
    appRoute = {
      ...appRoute,
      children: formatedRoutes,
    };
    formatedRoutes = [appRoute];
  }
  return formatedRoutes;
};
