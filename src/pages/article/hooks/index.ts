import axios from 'axios';
import { useQuery } from 'react-query';
import apis from '../../../mock/apis';

import { IArticle } from '../../article-manage/interface';

/**
 * 获取创作者创建的所有文章
 * @param id 创作者id
 * @returns
 */
const fetchAllArticles = async () => {
  return await axios.get<IArticle[]>(`${apis.fetchAllArticle}`);
};

/**
 * 获取创作者创建的所有文章
 * @param id 创作者id
 * @returns
 */
export const useFetchAllArticle = () => {
  return useQuery('fetchAllArticles', fetchAllArticles, {
    select: (data) => {
      return data.data;
    },
  });
};
