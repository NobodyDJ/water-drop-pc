import { useState, useEffect } from 'react';

import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Outlet } from 'react-router-dom';
import style from './index.module.less'
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_CONFIG } from '@/routes';
/**
*
*/
const Layout = () => {
    const [state, setState] = useState();
    const { store } = useUserContext();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (
        <ProLayout
            siderWidth={130}
            layout='mix'
            avatarProps={{
                src: '',
                title: store.tel,
                size: 'small'
            }}
            logo='https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png'
            title={ false }
            className={style.container}
            route={{
                path: '/',
                children: ROUTE_CONFIG
            }}
        >
            <PageContainer>
                {/* 此处使用useOutLet的hook也可以实现相同功能 */}
                <Outlet></Outlet>
            </PageContainer>
        </ProLayout>
    );
};

export default Layout;
