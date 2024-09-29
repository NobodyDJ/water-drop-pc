import { useState } from 'react';

import style from './index.module.less';
import { Button, Col, Drawer, message, Row, Space, Tabs } from 'antd';
import { getColumns, getMaxKey, isWorkDay } from './constants';
import { EditableProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { DAYS, IDay, IOrderTime } from '@/utils/types';
import { useOrderTime } from './hooks';

/**
*   课程预约时间
*/

interface IProps{
    id: string;
    onClose: () => void;
}


const OrderTime = ({
    id,
    onClose
}: IProps
) => {
    const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
    // 获取课程信息
    const onTabChangeHandler = (activeKey: string) => {
        const current = DAYS.find((item) => item.key === activeKey) as IDay;
        setCurrentDay(current);
    }
    const convertToValidTime = (inputTime: string) => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        
        // 尝试解析为完整的日期时间
        const dateTime = dayjs(inputTime);
        if (dateTime.isValid()) return dateTime;
      
        // 尝试将仅时间格式（如 '11:00:00'）转换为当前日期的完整日期时间
        const timeFormat = dayjs(`${currentDate} ${inputTime}`, 'YYYY-MM-DD HH:mm:ss');
        if (timeFormat.isValid()) return timeFormat;
      
        // 返回无效时的默认值（例如：当前时间）
        return dayjs();
      };
      
    const {
        orderTime,
        loadingCourse,
        editLoading,
        onDeleteHandler,
        onSaveHandler,
        allWorkDaySyncHandler,
        allWeekSyncHandler
    } = useOrderTime(id, currentDay);
    return (
        <div className={style.container}>
            <Drawer
                title="编辑预约时间"
                width={720}
                open
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
                    loading={ editLoading || loadingCourse}
                    rowKey="key"
                    value={orderTime}
                    columns={getColumns((key: number) => onDeleteHandler(key))}
                    editable={{
                        onSave: async (key, row) => {
                            // 增加逻辑判断
                            const startTime1 = convertToValidTime(row.startTime);
                            const endTime1 = convertToValidTime(row.endTime);
                            if (startTime1.isAfter(endTime1)) {
                                message.error('开始时间不能大于结束时间');
                                return
                            }
                            const resIndex = (orderTime || []).findIndex((item) => item.key === key);
                            let newData = [];
                            if (resIndex > -1) {
                                newData = orderTime?.map(item => (item.key === key ? _.omit(row, 'index') : { ...item }));
                            } else {
                                newData = [...(orderTime || []), _.omit(row, 'index')];
                            }
                            newData = newData.map((item) => {
                                const formatStartTime = dayjs(item.startTime);
                                const formatEndTime = dayjs(item.endTime);
                                return {
                                    ...item,
                                    startTime: formatStartTime.isValid() ? dayjs(item.startTime).format('HH:mm:ss') : item.startTime,
                                    endTime: formatEndTime.isValid() ? dayjs(item.endTime).format('HH:mm:ss') : item.endTime
                                }
                            })
                            onSaveHandler(newData);
                        },
                        onDelete: async (key) => {
                            onDeleteHandler(key as number);
                        }

                    }}
                    recordCreatorProps={{
                        // 增加一个当前行
                        record: ()=>(
                            {
                                key: getMaxKey(orderTime) + 1,
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
                            disabled={!isWorkDay(currentDay.key)}
                            onClick={allWorkDaySyncHandler}
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
                            onClick={allWeekSyncHandler}
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
