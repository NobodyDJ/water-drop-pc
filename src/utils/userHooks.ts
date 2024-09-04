import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "./contextFactory";
import { GET_USER } from "../grapgql/user";

const KEY = 'userInfo';
const DEFAULT_VALUE = {

}

// 获取某个具体全局变量的值
export const useUserContext = () => useAppContext(KEY);

// 获取某个具体子组件
export const connect = connectFactory(KEY, DEFAULT_VALUE);

// 获取用户信息
export const useGetUser = () => {
    const { setStore } = useUserContext();
    useQuery(GET_USER, {
        onCompleted: (data) => {
            if (data.getUserInfo) {
                const { id, name, tel } = data.getUserInfo;
                setStore({
                    id, name, tel,
                })
                return;
            }
            // 用户没有登录要返回登录界面
            // 防止token没有拿到后，页面重复刷新跳转登陆页面
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        },
        onError: () => {
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
    });
}