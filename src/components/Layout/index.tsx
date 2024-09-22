import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from './index.module.less'
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { AUTH_TOKEN } from '@/utils/constants';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { useGoTo } from '@/hooks';
import OrgSelect from '../OrgSelect';


const menuItemRender = (
    Item: MenuDataItem,
    dom: React.ReactNode) => {
    return <Link to={Item.path || '/'}>{ dom }</Link>
}
/**
*   外层框架
*/
const Layout = () => {
    const { store } = useUserContext();
    const nav = useNavigate();
    const { go } = useGoTo();
    const logout = () => {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, '');
        nav('/login');
    }
    const goToOrg = () => {
        go(ROUTE_KEY.ORG);
    }
    return (
        <ProLayout
            siderWidth={150}
            layout='mix'
            avatarProps={{
                src: store.avatar || null,
                title: store.name,
                size: 'small',
                onClick: ()=> go(ROUTE_KEY.MY),
            }}
            links={[
                <Space size={20} onClick={logout}>
                    <LogoutOutlined />
                    退出
                </Space>
            ]}
            logo='https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png'
            title={ false }
            className={style.container}
            route={{
                path: '/',
                children: routes
            }}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => nav('/')}
            actionsRender={
                () => [
                    <OrgSelect />,
                    <Tooltip title="门店管理">
                        <ShopOutlined onClick={goToOrg}/>
                    </Tooltip>
                ]
            }
        >
            {/* 此处使用useOutLet的hook也可以实现相同功能 */}
            <Outlet></Outlet>
        </ProLayout>
    );
};

export default Layout;
