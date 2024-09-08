import { useState, useEffect } from 'react';

import style from './index.module.less';

/**
*
*/
const My = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (
        <div className={style.container}>个人信息</div>
    );
};

export default My;
