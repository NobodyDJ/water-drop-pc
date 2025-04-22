import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "../utils/contextFactory";
import { GET_USER } from "../graphql/user";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "@/utils/types";
import { AUTH_TOKEN } from "@/utils/constants";

const KEY = 'userInfo';
const DEFAULT_VALUE = {}

// 获取某个具体全局变量的值
export const useUserContext = () => useAppContext<IUser>(KEY);

// 获取某个具体子组件
export const connect = connectFactory(KEY, DEFAULT_VALUE);

// 获取用户信息
export const useGetUser = () => {
    const { setStore } = useUserContext();
    const location = useLocation();
    const nav = useNavigate();
    const token = localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);

    const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
        skip: !token,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            if (data.getUserInfo) {
                const { id, name, tel, desc, avatar } = data.getUserInfo;
                setStore({
                    id, name, tel, desc, avatar, refetchHandler: refetch
                });
                if (location.pathname.startsWith('/login')) {
                    nav('/home');
                }
                return;
            }
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