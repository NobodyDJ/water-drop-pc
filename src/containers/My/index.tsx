import { useEffect, useRef } from 'react';

import { PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { App, Col, Row, Space } from 'antd';
import OSSImageUpload from '@/components/OSSImageUpload';
import { useUserContext } from '@/hooks/userHooks';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/graphgql/user';
import FormItem from 'antd/es/form/FormItem';
import styles from './index.module.less'

/**
*
*/
const My = () => {
    const formRef = useRef<ProFormInstance>();
    const { store } = useUserContext();
    const [updateUserInfo] = useMutation(UPDATE_USER);
    const { message } = App.useApp();
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
                    const res = await updateUserInfo({
                        variables: {
                            id: store.id,
                            params: {
                                name: values.name,
                                desc: values.desc,
                                avatar: values.avatar?.url || ''
                            }
                        }
                    })
                    if (res.data.updateUserInfo.code === 200) {
                        store.refetchHandler();
                        message.success(res.data.updateUserInfo.message);
                        return
                    }
                    message.error(res.data.updateUserInfo.message);
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
                        <FormItem className={styles.avatar } name="avatar">
                            <OSSImageUpload />
                        </FormItem>
                    </Col>
                </Row>
            </ProForm>
        </PageContainer>
    );
};

export default My;
