import { useEffect, useRef } from 'react';

import { PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Col, message, Row } from 'antd';
import OSSImageUpload from '@/components/OSSImageUpload';
import { useUserContext } from '@/hooks/userHooks';

/**
*
*/
const My = () => {
    const formRef = useRef<ProFormInstance>();
    const { store } = useUserContext();
    console.log('store', store);
    useEffect(() => {
        // 初始化用户信息
        if (!store.tel) return;
        console.log('store', store);
        formRef.current?.setFieldsValue({
            tel: store.tel,
            name: store.name,
            desc: store.desc,
            avatar: {
                url: store.avatar
            }
        })
    }, [store]);
    return (
        <PageContainer>
            <ProForm
                formRef={formRef}
                layout="horizontal"
                submitter={{
                    resetButtonProps: {
                        style: {
                            display: 'none'
                        }
                    }
                }}
                onFinish={async (values) => {
                    console.log('values', values);
                    message.success('更新成功');
                }}
            >
                <Row>
                    <Col>
                        <ProFormText
                            name="tel"
                            label="手机号"
                            tooltip="不能修改"
                            disabled
                        />
                        <ProFormText
                            name="name"
                            label="昵称"
                            placeholder="请输入昵称"
                        />
                        <ProFormTextArea
                            name="desc"
                            label="简介"
                            placeholder="请输入简介信息"
                        />
                    </Col>
                    <Col>
                        <OSSImageUpload />
                    </Col>
                </Row>
            </ProForm>
        </PageContainer>
    );
};

export default My;
