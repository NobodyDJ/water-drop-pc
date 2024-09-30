import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import { AUTH_TOKEN } from "./constants";
import { getCurrentOrg } from ".";
const httpLink = createHttpLink({
    uri: '//localhost:3000/graphql',
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

export const client = new ApolloClient({
    // 相当于在发送请求之前，在headers里面加了一些属性，如Authorization
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false
    }), // 缓存查询结果
})