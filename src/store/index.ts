import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as baseUseDispatch,
  useSelector as baseUseSelector,
} from 'react-redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import articleUserReducer from './modules/article-user';
import { persistedReducer } from './util';

export const store = configureStore({
  reducer: {
    articleUser: persistedReducer(articleUserReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/** 持久化整个store */
export const persistor = persistStore(store);

// 从store自身获取状态的类型定义
export type RootState = ReturnType<typeof store.getState>;
// 从dispatch自身获取类型定义
export type AppDispatch = typeof store.dispatch;

/** 使用RootState代替默认的DefaultRootState，使得获取状态时也能提供默认的类型定义 */
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;

/** 重写useDispatch添加类型定义 */
export const useDispatch = () => baseUseDispatch<AppDispatch>();
