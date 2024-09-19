import { useMemo } from 'react';

import style from './index.module.less';
import { Col, Divider, Drawer, Form, Input, Row, Select, Spin } from 'antd';
import OSSImageUpload from '@/components/OSSImageUpload';
import { useOrganization } from '@/services/org';

//11
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
}: IProp) => {
    const [form] = Form.useForm();
    const { data, loading: queryLoading } = useOrganization(id);
    const initValue = useMemo(() => {
        return data ? {
            ...data,
            tags: data.tags?.split(','),
        } : {}
    }, [data])
    
    if (queryLoading) {
        return <Spin />;
    }

    return (<Drawer
        title="编辑门店信息"
        width="70vw"
        onClose={onClose}
        open
      >
        <Form form={form} initialValues={initValue} layout="vertical">
            <Row className={style.row} gutter={20}>
            <Col span={10}>
                <Form.Item
                style={{ width: '100%' }}
                label="Logo"
                name="logo"
                rules={[{ required: true }]}
                >
                <OSSImageUpload
                    maxCount={1}
                    label="替换 Logo"
                />
                </Form.Item>
            </Col>
            <Col span={14}>
                <Form.Item
                style={{ width: '100%' }}
                label="名称"
                name="name"
                rules={[{ required: true }]}
                >
                <Input placeholder="请输入门店名称" />
                </Form.Item>
            </Col>
            </Row>
            <Row className={style.row} gutter={20}>
            <Col span={11}>
                <Form.Item
                label="标签"
                name="tags"
                rules={[{ required: true }]}
                >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="请输入标签"
                />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                label="手机号"
                name="tel"
                rules={[{ required: true }]}
                >
                <Input placeholder="请输入手机号" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                label="经度"
                name="longitude"
                rules={[{ required: true }]}
                >
                <Input placeholder="请输入经度" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                label="纬度"
                name="latitude"
                rules={[{ required: true }]}
                >
                <Input placeholder="请输入纬度" />
                </Form.Item>
            </Col>
            </Row>
            <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true }]}
            >
            <Input placeholder="请输入地址" />
            </Form.Item>
            <Form.Item
            label="门店简介"
            name="description"
            rules={[{ required: true }]}
            >
            <Input.TextArea
                maxLength={500}
                rows={5}
                className={style.textArea}
                allowClear
                showCount
            />
            </Form.Item>
            <Row className={style.row} gutter={20}>
            <Col span={8}>
                <Form.Item
                style={{ width: '100%' }}
                label="营业执照"
                name="businessLicense"
                rules={[{ required: true }]}
                >
                <OSSImageUpload
                    label="替换营业执照"
                    maxCount={1}
                    imgCropAspect={3 / 2}
                />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                style={{ width: '100%' }}
                label="身份证正面"
                name="identityCardFrontImg"
                rules={[{ required: true }]}
                >
                <OSSImageUpload
                    label="替换身份证"
                    maxCount={1}
                    imgCropAspect={3 / 2}
                />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                style={{ width: '100%' }}
                label="身份证背面"
                name="identityCardBackImg"
                rules={[{ required: true }]}
                >
                <OSSImageUpload
                    label="替换身份证"
                    maxCount={1}
                    imgCropAspect={3 / 2}
                />
                </Form.Item>
            </Col>
            </Row>

            <Divider>门店顶部图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
            <Form.Item name="orgFrontImg">
            <UploadImage maxCount={5} imgCropAspect={2 / 1} />
            </Form.Item>
            <Divider>门店室内图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
            <Form.Item name="orgRoomImg">
            <UploadImage maxCount={5} imgCropAspect={2 / 1} />
            </Form.Item>
            <Divider>门店其他图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
            <Form.Item name="orgOtherImg">
            <UploadImage maxCount={5} imgCropAspect={2 / 1} />
            </Form.Item>
        </Form>
      </Drawer>);
};

export default EditOrg;
