import { useEffect, useMemo, useState } from 'react';

import style from './index.module.less';
import { Button, Col, Drawer, Row, Space, Tabs } from 'antd';
import { getColumns } from './constants';
import { EditableProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import { useCourse, useCourseInfo, useEditCourseInfo } from '@/services/course';
import _ from 'lodash';
import { DAYS, IDay, IOrderTime, IWeekCourse } from '@/utils/types';

/**
*   课程预约时间
*/

interface IProps{
    id: string;
    onClose: () => void;
    open: boolean
}


const OrderTime = ({
    id,
    open,
    onClose
}: IProps
) => {
    const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
    const [reducibleTime, setReducibleTime] = useState<IWeekCourse[]>([]);
    // 获取课程信息
    const { loading, getCourse } = useCourse();
    const { data, loading: loadingCourse, refetch } = useCourseInfo(id);
    const [edit, editLoading] = useEditCourseInfo();
    // 用于渲染到预约课程的时间段列表
    const orderTime = useMemo(() => {
        const res = (data?.reducibleTime || []).find((item) => item.week === currentDay.key)?.orderTime as IOrderTime[];
        return res
    },[data])
    useEffect(() => {
        const init = async () => {
            if (id) {
                const res = await getCourse(id);
                setReducibleTime(res.reducibleTime || []);
            }
        }
        init();
    }, [id]);
    const onTabChangeHandler = (activeKey: string) => {
        const current = DAYS.find((item) => item.key === activeKey) as IDay;
        setCurrentDay(current);
    }
    const onDeleteHandler = () => {
        
    }
    const onSaveHandler = (ot: IOrderTime[]) => {
        const rt = [...(data?.reducibleTime || [])];
        // 确定是周几的课程节次
        const index = reducibleTime.findIndex((item) => item.week === currentDay.key);
        if (index > -1) {
            // 更新
            rt[index] = {
                week: currentDay.key,
                orderTime: ot,
            }
        } else {
            // 新增
            rt.push({
                week: currentDay.key,
                orderTime: ot,
            })
        }
        edit(id, {
            reducibleTime: rt
        }, ()=> refetch())
    }
    return (
        <div className={style.container}>
            <Drawer
                title="编辑预约时间"
                width={720}
                open={open}
                onClose={() => onClose()}
                forceRender
            >
                <Tabs
                    type="card"
                    items={DAYS}
                    onChange={onTabChangeHandler}
                />
                {/* 注意这里确定表格每一行的数据字段很重要 */}
                <EditableProTable<IOrderTime>
                    headerTitle={(
                        <Space>
                            选择
                            <span className={style.name}>
                                { currentDay.label }
                            </span>
                            的课开放预约的时间
                        </Space>
                    )}
                    loading={loading || editLoading || loadingCourse}
                    rowKey="key"
                    value={orderTime}
                    columns={getColumns(() => onDeleteHandler)}
                    editable={{
                        onSave: async (key, row) => {
                            console.log('orderTime', orderTime);
                            const resIndex = (orderTime || []).findIndex((item) => item.key === key);
                            let newData = [];
                            if (resIndex > -1) {
                                newData = orderTime.map((item) => {
                                    if (item.key === key) {
                                        return row
                                    } else {
                                        return item
                                    }
                                })
                            }
                            newData = [...orderTime, _.omit(row, 'index')];
                            onSaveHandler(newData);
                        }
                    }}
                    recordCreatorProps={{
                        // 增加一个当前行
                        record: (index: number)=>(
                            {
                                key: index + 1,
                                startTime: dayjs(new Date()).format('HH:mm:ss'),
                                endTime: dayjs(new Date()).format('HH:mm:ss')
                            }
                        )
                    }}
                />
                <Row gutter={20} className={style.buttons}>
                    <Col span={12}>
                        <Button
                            icon={<RedoOutlined />}
                            style={{ width: '100%' }}
                            type="primary"
                        >
                            全工作日同步
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            icon={<ChromeOutlined />}
                            style={{ width: '100%' }}
                            type="primary"
                            danger
                        >
                            全周同步
                        </Button>
                    </Col>
                </Row>
            </Drawer>
        </div>
    );
};

export default OrderTime;
