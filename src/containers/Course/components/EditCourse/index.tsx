import style from './index.module.less';
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Space, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCourseInfo, useEditCourseInfo } from '@/services/course';
import { useEffect } from 'react';

interface IProps{
    id?: string;
    onClose: (isReload: boolean) => void;
}

/**
*   创建/编辑课程
*/
const EditCourse = ({
    id,
    onClose,
}: IProps) => {
    const [form] = Form.useForm();
    const [handleEdit] = useEditCourseInfo();
    // const { loading, getCourse } = useCourse();
    const { loading, refetch } = useCourseInfo(id || '');
    useEffect(() => {
        const init = async () => {
            if (id) {
                const res = await refetch();
                form.setFieldsValue(res.data.getCourseInfo.data);
            } else {
                form.resetFields();
            }
        }
        init();
    }, [id]);
    const onSubmitHandler = async () => {
        const values = await form.validateFields();
        if (values) {
            handleEdit(id, values, (isReload = true) => onClose(isReload));
        }
    }
    return (<div className={style.container}>
        <Drawer
            title={id ? '编辑课程' : '添加课程'}
            width={720}
            open
            onClose={() => onClose(false)}
            extra={
                <Space>
                    <Button onClick={()=>onClose(false)}>取消</Button>
                    <Button loading={loading} onClick={onSubmitHandler} type="primary">
                        提交
                    </Button>
                </Space>
            }
        >
            <Spin spinning={loading}>
                <Form form={form}>
                    <Form.Item
                        label="课程名称"
                        name="name"
                        rules={[{
                        required: true,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="课程描述"
                        name="desc"
                        rules={[{
                            required: true,
                        }]}
                    >
                        <TextArea rows={5} showCount maxLength={200} />
                    </Form.Item>
                    <Row gutter={20}>
                        <Col>
                            <Form.Item
                                label="限制人数"
                                name="limitNumber"
                                rules={[{
                                required: true,
                                }]}
                            >
                                <InputNumber min={0} addonAfter="人" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                label="持续时长"
                                name="duration"
                                rules={[{
                                required: true,
                                }]}
                            >
                                <InputNumber min={0} addonAfter="分钟" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="适龄人群"
                        name="group"
                        rules={[{
                            required: true,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="基础能力"
                        name="baseAbility"
                        rules={[{
                            required: true,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="预约信息"
                        name="reserveInfo"
                        rules={[{
                            required: true,
                        }]}
                    >
                        <TextArea rows={5} showCount maxLength={200} />
                    </Form.Item>
                    <Form.Item
                        label="退款信息"
                        name="refundInfo"
                        rules={[{
                            required: true,
                        }]}
                    >
                        <TextArea rows={5} showCount maxLength={200} />
                    </Form.Item>
                    <Form.Item label="其他信息" name="otherInfo">
                        <TextArea rows={5} showCount maxLength={200} />
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    </div>);
};

export default EditCourse;
