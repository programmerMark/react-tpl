import { AnyAction } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

/** 持久化redux的基本配置 */
const persistConfig = {
  key: 'root' /** 持久化后的键名，实际为：`persist:${root}` */,
  version: 1 /** 整数形式的状态版本 */,
  storage /** 持久化的状态的适配器 */,
  // 默认持久化所有所有状态，注意启用白名单后键名数组为空将不会持久化数据，谨慎启用
  // blacklist: [] /** 键名黑名单：字符串形式的键名数组，黑名单中的键名不会被持久化 */,
  // whitelist: [] /** 键名白名单：字符串形式的键名数组，只有白名单中的键名会被持久化 */,
};

/**
 * 持久化reducer
 * @param reducer reducer实例（注意：指的是redux的reducer而不是react的reducer）
 * @returns
 */
export function persistedReducer<T>(reducer: Reducer<T, AnyAction>) {
  return persistReducer(persistConfig, reducer);
}
