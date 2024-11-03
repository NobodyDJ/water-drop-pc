import { Button, Calendar, Card, Col, DatePicker, message, Row } from 'antd';
import style from './index.module.less';
// 此处会出现循环依赖，问题的本质是组件的循环引用，将组件抽离出来即可
import { useUserContext } from '@/hooks/userHooks';
import { PageContainer } from '@ant-design/pro-components';
import { useOrganization } from '@/services/org';
import { useState } from 'react';
import { DAY_FORMAT } from '@/utils/constants';
import { useAutoCreateSchedule } from '@/services/dashboard';
import dayjs, { Dayjs } from 'dayjs';

/**
*
*/
const Home = () => {
    const { store } = useUserContext();
    const [range, setRange] = useState<[string, string]>(['', '']);
    const { data: org } = useOrganization(store.currentOrg || '');
    const [run, loading] = useAutoCreateSchedule();
    const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));
    const { RangePicker } = DatePicker;
    if (!org) {
        return null;
    }
    
    const startScheduleHandler = () => {
        if (!range[0]) {
            message.error('请选择时间区间');
            return;
        }
        run(...range);
    };
    
    const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
        if (!days || !days[0] || !days[1]) {
            return;
        }
        setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
    };
    return (
        <PageContainer
            content={org.address}
            header={{
                title: org.name,
            }}
        >
            <Row gutter={20}>
            <Col flex="auto">
                <Card
                title={`${day} 的课程`}
                className={style.container}
                extra={
                (
                <span>
                    <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                    <Button
                        loading={loading}
                        type="link"
                        onClick={startScheduleHandler}
                    >
                        开始排课
                    </Button>
                </span>
                )
            }
                >
                    {/* <Schedule day={day} /> */}
                </Card>
            </Col>
            <Col flex="300px">
                <Calendar
                    fullscreen={false}
                    onChange={(d) => setDay(d.format(DAY_FORMAT))}
                />
            </Col>
            </Row>
        </PageContainer>
    );
};

export default Home;
