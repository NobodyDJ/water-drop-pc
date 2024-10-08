import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "../utils/contextFactory";
import { GET_USER } from "../graphgql/user";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "@/utils/types";

const KEY = 'userInfo';
const DEFAULT_VALUE = {

}

// 获取某个具体全局变量的值
export const useUserContext = () => useAppContext<IUser>(KEY);

// 获取某个具体子组件
export const connect = connectFactory(KEY, DEFAULT_VALUE);

// 获取用户信息
export const useGetUser = () => {
    const { setStore } = useUserContext();
    const location = useLocation();
    const nav = useNavigate()
    const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            if (data.getUserInfo) {
                const { id, name, tel, desc, avatar } = data.getUserInfo;
                setStore({
                    id, name, tel, desc, avatar, refetchHandler: refetch
                });
                // 确保登录之后，不再跳转到登录页面
                if (location.pathname.startsWith('/login')) {
                    nav('/home');
                }
                return;
            }
            // 用户没有登录要返回登录界面
            // 防止token没有拿到后，页面重复刷新跳转登陆页面
            setStore({ refetchHandler: refetch });
            if (location.pathname !== '/login') {
                nav(`/login?orgUrl=${window.location.pathname || '/home' }`);
            }
        },
        onError: () => {
            setStore({ refetchHandler: refetch });
            if (location.pathname !== '/login') {
                nav(`/login?orgUrl=${window.location.pathname || '/home'}`);
            }
        }
    });
    return { loading };
}