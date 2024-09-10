import { useState, useEffect } from 'react';

import style from './index.module.less';

/**
*   图片上传
*/
const OSSImageUpload = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (<div className={style.container}>sss</div>);
};

export default OSSImageUpload;
