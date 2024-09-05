import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "../utils/contextFactory";
import { GET_USER } from "../graphgql/user";
import { useLocation, useNavigate } from "react-router-dom";

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
    const location = useLocation();
    const nav = useNavigate()
    const { loading } = useQuery(GET_USER, {
        onCompleted: (data) => {
            if (data.getUserInfo) {
                const { id, name, tel } = data.getUserInfo;
                setStore({
                    id, name, tel,
                });
                // 确保登录之后，不再跳转到登录页面
                if (location.pathname.startsWith('/login')) {
                    nav('/');
                }
                return;
            }
            // 用户没有登录要返回登录界面
            // 防止token没有拿到后，页面重复刷新跳转登陆页面
            if (location.pathname.startsWith('/login')) {
                nav(`/login?orgUrl=${window.location.pathname}`);
            }
        },
        onError: () => {
            if (location.pathname.startsWith('/login')) {
                nav(`/login?orgUrl=${window.location.pathname}`);
            }
        }
    });
    return { loading };
}