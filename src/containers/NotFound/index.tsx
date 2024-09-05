import { Button, Result } from 'antd';
import { useUserContext } from '@/hooks/userHooks';

/**
*
*/
const NotFound = () => {
    const { store } = useUserContext();
    console.log('store', store);
    return (
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">返回首页</Button>}
        />
    );
};

export default NotFound;
