export interface IAuthor {
  id: string /** 创作者id */;
  name: string /** 创作者名称 */;
  title: string /** 创作者职称 */;
  portrait: string /** 创作者头像 */;
}

export interface IArticle {
  id?: string /** 文章id */;
  title: string /** 文章标题 */;
  authorId: string /** 创作者id */;
  authorName: string /** 创作者名称 */;
  content: string /** 文章内容 */;
  updateAt: number /** 文章更新时间 */;
}

export interface IArticlesProps {
  articles: IArticle[] /** 创作者id */;
}
