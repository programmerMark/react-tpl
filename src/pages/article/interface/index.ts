import { IArticle } from '../../article-manage/interface';

export interface IArticleCardProps {
  article: IArticle;
  // eslint-disable-next-line no-unused-vars
  handleClick: (id: string) => void;
}
