import Home from '@/containers/Home'
import Login from '@/containers/Login'
import NotFound from '@/containers/NotFound'
export const ROUTE_CONFIG = [
    {
        key: 'home',
        path: '/',
        element: Home,
        title: '首页'
    },
    {
        key: 'login',
        path: '/login',
        element: Login,
        title: '登录'
    },
    {
        key: 'NotFound',
        path: '*',
        element: NotFound,
        title: '未找到页面'
    }
]