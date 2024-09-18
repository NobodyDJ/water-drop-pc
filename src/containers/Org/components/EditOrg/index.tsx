import { useEffect } from 'react';

import style from './index.module.less';
import { Drawer } from 'antd';

interface IProp{
    id: string;
    onClose: () => void;
}

/**
*   门店信息
*/
const EditOrg = ({
    id,
    onClose
}:IProp) => {
    useEffect(() => {
        console.log(id, onClose);
    }, []);
    return (<Drawer
        title="Basic Drawer"
        closable={false}
        onClose={onClose}
        open
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>);
};

export default EditOrg;
