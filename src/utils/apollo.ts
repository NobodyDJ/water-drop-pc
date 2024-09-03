import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import { AUTH_TOKEN } from "./constants";
const httpLink = createHttpLink({
    uri: '//localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

export const client = new ApolloClient({
    // 相当于在发送请求之前，在headers里面加了一些属性，如Authorization
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(), // 缓存查询结果
})