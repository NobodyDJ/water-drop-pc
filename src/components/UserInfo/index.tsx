import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/hooks/userHooks';
import { Spin } from 'antd';
import { useLocation } from 'react-router-dom';

/**
*   获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const { loading } = useGetUser();
    
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <Spin spinning={loading}>
            <div>
                {children}
            </div>
        </Spin>
    );
};

const ConnectedStudentInfo = connect(UserInfo);

export default ConnectedStudentInfo;
