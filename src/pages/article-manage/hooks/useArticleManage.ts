import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import apis from '../../../mock/apis';
import { IArticle, IAuthor } from '../interface';

/**
 * 获取创作者信息
 * @param id 创作者id
 * @returns
 */
const fetchAuthorById = async (id: string) => {
  return await axios.get<IAuthor>(`${apis.fetchAuthorInfoById}/${id}`);
};

/**
 * 获取创作者信息
 * @param id 创作者id
 * @returns
 */
export const useFetchAuthor = (id: string) => {
  return useQuery('fetchAuthorById', () => fetchAuthorById(id), {
    select: (data) => {
      return data.data;
    },
  });
};

/**
 * 获取创作者创建的所有文章
 * @param id 创作者id
 * @returns
 */
const fetchArticlesById = async (id: string) => {
  return await axios.get<IArticle[]>(`${apis.fetchArticlesById}?authorId=${id}`);
};

/**
 * 获取创作者创建的所有文章
 * @param id 创作者id
 * @returns
 */
export const useFetchArticles = (id: string) => {
  return useQuery('fetchArticlesById', () => fetchArticlesById(id), {
    select: (data) => {
      return data.data;
    },
  });
};

/**
 * 根据id删除文章
 * @param id 文章id
 * @returns
 */
export const deleteArticleById = async (id: string) => {
  return await axios.delete(`${apis.deleteArticleById}/${id}`);
};

/**
 * 根据id删除文章
 * @param id 文章id
 * @returns
 */
export const useDeleteArticleById = (id: string, refetchFn: () => void) => {
  return useMutation('deleteArticleById', () => deleteArticleById(id), {
    onSuccess: () => {
      refetchFn();
    },
  });
};
