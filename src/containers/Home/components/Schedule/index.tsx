import { useSchedules } from '@/services/dashboard';
import style from './index.module.less';
import { Avatar, Descriptions, Space, Steps } from 'antd';

interface IProps{
    day: string;
}

/**
* 某一天的课程表
*/
const Schedule = ({
    day
}:IProps) => {
    const { data } = useSchedules(day);
    return (
        <div className={style.container}>
            <Steps
                direction='vertical'
                items={
                    data?.map((item) => ({
                        title: `${item.startTime}-${item.endTime} ${item.course.name}`,
                        description: (
                            <Descriptions
                                bordered
                                size="small"
                            >
                                {/* 讲师区域 */}
                                <Descriptions.Item
                                    span={3}
                                    label="讲师"
                                >
                                    <Space>
                                        {
                                            item.course.teachers.map((teacher) => (
                                              <Space key={teacher.id}>
                                                <Avatar
                                                  shape="square"
                                                  size="small"
                                                  src={teacher.photoUrl}
                                                />
                                                {teacher.name}
                                              </Space>
                                            ))
                                        }
                                    </Space>
                                </Descriptions.Item>
                                {/* 学生区域，涉及支付，暂未完成需要优化 */}
                                <Descriptions.Item
                                    span={3}
                                    label={`学员(${item.course.teachers.length})`}
                                    labelStyle={{
                                      width: 80,
                                    }}
                                >
                                    <Avatar.Group>
                                        {
                                            item.course.teachers.map((teacher) => (
                                              <Avatar
                                                key={teacher.id}
                                                src={teacher.photoUrl}
                                              />
                                            ))
                                        }
                                    </Avatar.Group>
                                </Descriptions.Item>
                            </Descriptions>
                        )
                    }))
                }
            />
        </div>
    );
};

export default Schedule;
