import style from './index.module.less';
import { connect, useUserContext } from '../../utils/userHooks';

/**
*
*/
const UserInfo = () => {
    const { store, setStore } = useUserContext()
    return (<div className={style.container}>sss</div>);
};

//
export default connect(UserInfo);
