import { Button } from 'antd';
import style from './index.module.less';
// 此处会出现循环依赖，问题的本质是组件的循环引用，将组件抽离出来即可
import { useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';

/**
*
*/
const Home = () => {
    const { store } = useUserContext();
    const { go } = useGoTo()
    console.log('store', store);
    return (<div className={style.container}>
        {store.tel}
        <Button onClick={()=>go(ROUTE_KEY.MY)}>
            去个人中心
        </Button>
    </div>);
};

export default Home;
