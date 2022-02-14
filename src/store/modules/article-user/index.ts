import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthorByIdThunk as fetchAuthorById } from './asyncThunk';
import { IArticleUser, IArticleUserState } from './interface';

/**
 * 初始化状态
 */
const initialState: IArticleUserState = {
  user: {
    id: '',
    name: '',
    title: '',
    portrait: '',
  },
};

/** 状态管理模块 */
export const ArticleUserModule = createSlice({
  name: 'article-user' /** 键名：建议与文件夹名称相同 */,
  initialState,
  /** 管理同步状态 */
  reducers: {
    login: (state, action: PayloadAction<IArticleUser>) => {
      state.user = action.payload;
    },
  },
  /**
   * 管理异步状态（提高开发效率为优先，而不是揪着概念不放）
   * 1. 不建议使用，建议使用更简单高效的react-query来代替RTK-query，asyncThunk对ts支持度不友好；
   * 2. redux在本项目中的使用意图是，管理页面、组件间共享的状态，
   *    组件内部定义的状态维护在组件内部，服务器状态通过react-query维护；
   * 3. 对于共享状态中的异步操作，在异步操作结束后更新同步状态，减少样板代码；
   * 4. 仍保留通过redux维护异步状态的能力，并提供示例代码；
   */
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorById.fulfilled, (state, { payload }) => {
      state.user = payload.data;
    });
  },
});

/**
 * 单独导出actions，供dispatch的时候传入使用
 * eg: dispatch(login(user))
 */
export const { login } = ArticleUserModule.actions;

/** 默认导出reducer */
export default ArticleUserModule.reducer;
