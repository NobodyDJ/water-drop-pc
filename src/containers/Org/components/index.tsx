import { useState, useEffect } from 'react';

import style from './index.module.less';

/**
*   门店信息
*/
const EditOrg = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (<div className={style.container}>sss</div>);
};

export default EditOrg;
