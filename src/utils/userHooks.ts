import { connectFactory, useAppContext } from "./contextFactory";

const KEY = 'userInfo';
const DEFAULT_VALUE = {

}

// 获取某个具体全局变量的值
export const useUserContext = () => useAppContext(KEY);

// 获取某个具体子组件
export const connect = connectFactory(KEY, DEFAULT_VALUE);