export interface IArticleUser {
  id: string /** 用户id */;
  name: string /**用户名 */;
  title: string /** 用户职称 */;
  portrait: string /** 用户头像 */;
}

export interface IArticleUserState {
  user: IArticleUser;
}
