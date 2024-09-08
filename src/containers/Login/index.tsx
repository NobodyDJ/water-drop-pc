import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs, theme } from 'antd';
import { useState } from 'react';
import styles from './index.module.less'
import { useMutation } from '@apollo/client';
import { LOGIN, SEND_CODE_MSG } from '@/graphgql/auth';
import { ProFormInstance } from '@ant-design/pro-components';
import React from 'react';
import { AUTH_TOKEN } from '@/utils/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
type LoginType = 'phone' | 'account';

interface IValue{
  tel: string;
  code: string;
  autoLogin: boolean;
}

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { token } = theme.useToken();
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  // 获取之前跳转失败的路径
  const [params] = useSearchParams();
  const { store } = useUserContext();
  const formRef = React.useRef<ProFormInstance>();// 引入获取form表单实例
  const nav = useNavigate();
  useTitle('登录')
  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values
    });
    if (res.data.login.code === 200) {
      store.refetchHandle();
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav(params.get('orgUrl') || '/home');
      return;
    }
    message.error(res.data.login.message);  
  }
  return (
    <div
      className={styles.container}
    >
      <LoginFormPage
        initialValues={{tel: '18221941518'}}
        logo="https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        onFinish={loginHandler}
        formRef={formRef}
      >
        <Tabs 
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={[{key: 'phone', label: '手机号登录'}]}
        >
          {/* <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
        </Tabs>
        {/* {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )} */}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="tel"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                const tel = formRef.current?.getFieldValue('tel');
                const res = await run({
                  variables: {
                    tel
                  }
                });
                console.log('res', res);
                if (res.data.sendCodeMsg.code === 200) {
                  message.success(res.data.sendCodeMsg.message);
                } else {
                  message.error(res.data.sendCodeMsg.message)
                }
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
