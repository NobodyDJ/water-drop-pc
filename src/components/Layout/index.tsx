import { useState, useEffect } from 'react';

import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from './index.module.less'
import { useUserContext } from '@/hooks/userHooks';
import { routes } from '@/routes/menus';
import { AUTH_TOKEN } from '@/utils/constants';


const menuItemRender = (
    Item: MenuDataItem,
    dom: React.ReactNode) => {
    return <Link to={Item.path || '/'}>{ dom }</Link>
}
/**
*   外层框架
*/
const Layout = () => {
    const [state, setState] = useState();
    const { store } = useUserContext();
    const nav = useNavigate();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    const logout = () => {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, '');
        nav('/login');
    }
    return (
        <ProLayout
            siderWidth={130}
            layout='mix'
            avatarProps={{
                src: 'https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png',
                title: store.tel,
                size: 'small',
                onClick: logout
            }}
            logo='https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png'
            title={ false }
            className={style.container}
            route={{
                path: '/',
                children: routes
            }}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={()=>nav('/')}
        >
            {/* 此处使用useOutLet的hook也可以实现相同功能 */}
            <Outlet></Outlet>
        </ProLayout>
    );
};

export default Layout;
