export interface IInitRoute {
  path: string;
  parentPath?: string;
  element: any;
}

export interface IRoute extends IInitRoute {
  children: IRoute[];
}
