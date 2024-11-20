import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import { AUTH_TOKEN } from "./constants";
import { getCurrentOrg } from ".";
import { message } from 'antd';
import { onError } from '@apollo/client/link/error';

const uri = '/graphql';
// if (process.env.NODE_ENV === 'production') {
//   uri = 'https://water-drop.yondu.vip/graphql';
// }

const httpLink = createHttpLink({
    uri,
});

const authLink = setContext((_, { headers }) => {
    // 发送请求之前添加Authorization属性
    // 获取到的token中携带用户的id信息
    const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
    const org = getCurrentOrg();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            orgId: org.value
        }
    }
})

const errorLink = onError(({
    graphQLErrors,
    networkError,
  }) => {
    if (graphQLErrors) {
        message.error('请求参数或者返回的数据格式不对');
        graphQLErrors.forEach((item) => {
            if (item.message === 'Unauthorized') {
                message.error('登录失效，请登录');
            }
        });
    }
    if (networkError) {
        message.error(networkError.message);
    }
  });

export const client = new ApolloClient({
    // 相当于在发送请求之前，在headers里面加了一些属性，如Authorization
    // 出错请求处理
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache({
        addTypename: false
    }), // 缓存查询结果
})