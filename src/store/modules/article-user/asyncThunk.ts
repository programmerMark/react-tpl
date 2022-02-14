import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apis from '../../../mock/apis';
// import apis from 'mock/apis';
import { IArticleUser } from './interface';

/**
 * 获取创作者信息
 * @param id 创作者id
 * @returns
 */
const fetchAuthorById = async (id: string) => {
  return await axios.get<IArticleUser>(`${apis.fetchAuthorInfoById}/${id}`);
};

export const fetchAuthorByIdThunk = createAsyncThunk(
  'article-user/fetchAuthorById',
  fetchAuthorById,
);
