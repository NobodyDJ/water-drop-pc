import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import { Button, Result } from 'antd';

/**
*   NotFound
*/
const NotFound = () => {
    const { go } = useGoTo();
    return (
        <Result
        status="404"
        title="404"
        subTitle="抱歉您所访问的页面不存在。"
        extra={<Button type="primary" onClick={()=>go(ROUTE_KEY.HOME)}>返回首页</Button>}
        />
    );
};

export default NotFound;
