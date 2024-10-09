import { GiftOutlined, HomeOutlined, PicRightOutlined, ShopOutlined, TeamOutlined } from '@ant-design/icons'

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
    ORG: 'org',
    NO_ORG: 'noOrg',
    STUDENT: 'student',
    Course: 'course',
    Product: 'product',
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
    [ROUTE_KEY.ORG]: {
        path: 'org',
        name: '门店管理',
        hideInMenu: true,
        icon: <ShopOutlined/>
    },
    [ROUTE_KEY.NO_ORG]: {
        path: 'noOrg',
        name: '选择门店提示',
        hideInMenu: true,
    },
    [ROUTE_KEY.STUDENT]: {
        path: 'student',
        name: '学员管理',
        icon: <TeamOutlined />
    },
    [ROUTE_KEY.ORG]: {
        path: 'org',
        name: '门店管理',
        hideInMenu: true,
        icon: <ShopOutlined/>
    },
    [ROUTE_KEY.Course]: {
        path: 'course',
        name: '课程管理',
        icon: <PicRightOutlined />
    },
    [ROUTE_KEY.Product]: {
        path: 'product',
        name: '商品管理',
        icon: <GiftOutlined />
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
