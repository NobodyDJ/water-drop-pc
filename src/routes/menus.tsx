import { HomeOutlined, ShopOutlined } from '@ant-design/icons'

// 定义路由的数据结构
interface IRoute{
    path: string;
    name: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean
}

export const ROUTE_KEY = {
    HOME: 'home',
    MY: 'my',
    Org: 'org',
    NotFound: 'NotFound',
  };

export const ROUTE_CONFIG: Record<string, IRoute> = {
    [ROUTE_KEY.HOME]: {
        path: 'home',
        name: '首页',
        icon: <HomeOutlined/>
    },
    [ROUTE_KEY.MY]: {
        path: 'my',
        name: '个人信息',
        hideInMenu: true,
        icon: <HomeOutlined/>
    },
    [ROUTE_KEY.Org]: {
        path: 'org',
        name: '门店信息',
        icon: <ShopOutlined/>
    },
    [ROUTE_KEY.NotFound]: {
        path: '*',
        hideInMenu: true,
        name: '404'
    }
}
// 获取路由列表
export const routes = Object.keys(ROUTE_CONFIG).map((key) => {
    return {
        ...ROUTE_CONFIG[key],
        key
    }
});

// 获取具体的路由信息
export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
