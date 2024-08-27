import { useState, useEffect } from 'react';
import { Button, Result } from 'antd';

/**
*
*/
const NotFound = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
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
