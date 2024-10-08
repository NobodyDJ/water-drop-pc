import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { getColumns } from './constant';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { ICourse } from '@/utils/types';
import { useCourses } from '@/services/course';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import EditCourse from './components/EditCourse';
import OrderTime from './components/OrderTime';
import ConsumerCard from './components/ConsumerCard';

/**
*   课程信息
*/
const Course = () => {
    const { data, refetch } = useCourses();
    const [showInfo, setShowInfo] = useState(false);
    const [curId, setCurId] = useState('');
    const [showOrderTime, setShowOrderTime] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const actionRef = useRef<ActionType>();
    const onEditHandler = (id?: string) => {
        if (id) {
            setCurId(id);
        } else {
            setCurId('');
        }
        setShowInfo(true);
    }
    const closeAndFetchHandler = (isReload: boolean) => {
        setShowInfo(false);
        setShowOrderTime(false);
        setShowCard(false);
        if (isReload) {
            actionRef.current?.reload(); // 使用此方法调用的数据，是不会把数据传递给表格组件，需要调用表格的刷新组件，实时获取数据
        }
    }
    const onOrderTimeHandler = (id: string) => {
        if (id) {
            setCurId(id);
        } else {
            setCurId('');
        }
        setShowOrderTime(true);
    }
    const onCardHandler = (id: string) => {
        if (id) {
            setCurId(id);
        } else {
            setCurId('');
        }
        setShowCard(true);
    }
    return (
        <PageContainer
            header={{
                title: '当前门店下开设的课程'
            }}
        >
            <ProTable<ICourse>
                rowKey='id'
                columns={getColumns({
                    onEditHandler,
                    onOrderTimeHandler,
                    onCardHandler
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
            { showInfo && <EditCourse id={curId} onClose={(isReload: boolean) => closeAndFetchHandler(isReload)} />}
            { showOrderTime && <OrderTime id={curId} onClose={(isReload: boolean) => closeAndFetchHandler(isReload)} />}
            { showCard && <ConsumerCard id={curId} onClose={(isReload: boolean) => closeAndFetchHandler(isReload)} />}
        </PageContainer>
    );
};

export default Course;
