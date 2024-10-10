import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { getColumns } from './constant';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { IProduct } from '@/utils/types';
import { useDeleteProduct, useProducts } from '@/services/product';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import EditProduct from './components/EditProduct';
import ConsumerCard from './components/ConsumerCard';

/**
*   产品信息
*/
const Product = () => {
    const { data, refetch } = useProducts();
    const [showInfo, setShowInfo] = useState(false);
    const [curId, setCurId] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [del, delLoading] = useDeleteProduct();
    const actionRef = useRef<ActionType>();
    const onEditHandler = (id?: string) => {
        if (id) {
            setCurId(id);
        } else {
            setCurId('');
        }
        setShowInfo(true);
    }
    const closeAndFetchHandler = (isReload?: boolean) => {
        setShowInfo(false);
        setShowCard(false);
        if (isReload) {
            actionRef.current?.reload(); // 使用此方法调用的数据，是不会把数据传递给表格组件，需要调用表格的刷新组件，实时获取数据
        }
    }
    const onCardHandler = (id: string) => {
        if (id) {
            setCurId(id);
        } else {
            setCurId('');
        }
        setShowCard(true);
    }
    const onDeleteHandler = (id: string) => {
        del(id, ()=>closeAndFetchHandler(true))
    }
    return (
        <PageContainer
            header={{
                title: '当前门店下开设的课程'
            }}
        >
            <ProTable<IProduct>
                rowKey='id'
                form={{
                    ignoreRules: false
                }}
                loading={delLoading}
                columns={getColumns({
                    onEditHandler,
                    onCardHandler,
                    onDeleteHandler
                })}
                dataSource={data}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE
                }}
                request={refetch}
                toolBarRender={() => [
                    <Button key="add" onClick={() => onEditHandler()} type="primary" icon={<PlusOutlined/> }>新建</Button>
                ]}
                actionRef={actionRef}
            />
            {/* 组件按需加载不需要同时加载 */}
            { showInfo && <EditProduct id={curId} onClose={(isReload?: boolean) => closeAndFetchHandler(isReload)} />}
            { showCard && <ConsumerCard id={curId} onClose={(isReload: boolean) => closeAndFetchHandler(isReload)} />}
        </PageContainer>
    );
};

export default Product;
