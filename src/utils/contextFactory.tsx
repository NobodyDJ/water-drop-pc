/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useState } from "react";
import { IPropChild, IStore } from "./types";

function getCxtProvider<T>(
    key: string,
    defaultValue: T,
    AppContext: React.Context<IStore<T>>,
) {
    return ({ children }: IPropChild) => {
        const [store, setStore] = useState(defaultValue);
        const value = useMemo(() => ({
            // 实现一个增量更新，setState传入一个函数的第一个参数state表示先前更新state的值
            key, store, setStore: (payload: any) => setStore((prevState) => ({
                ...prevState,
                ...payload
            }))
        }), [store])
        return (
            <AppContext.Provider
                value={value}
            >
                {children}
            </AppContext.Provider>
        )
    }
}

const cxtCache: Record<string, Cxt> = {};

// 给定一个默认值不然常量cxtCache会报错
class Cxt<T = any>{
    defaultStore: IStore<T>;
    AppContext: React.Context<IStore<T>>;
    Provider: ({ children }: IPropChild) => JSX.Element;
    constructor(key: string, defaultValue: T) {
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: ()=>{},
        }
        // 将全局变量存储在AppContext中
        this.AppContext = createContext(this.defaultStore);
        this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
        cxtCache[key] = this;
    }
}

// 封装了获取具体全局变量的hooks
export function useAppContext<T>(key: string){
    const cxt = cxtCache[key] as Cxt<T>;
    // useContext返回的数据结构为{ key, store, setStore }
    // 因为AppContext.Provider组件提供的value包含这些值
    const app = useContext(cxt.AppContext);
    return {
        store: app.store,
        setStore: app.setStore
    }
}

// 返回具体子组件
export function connectFactory<T> (
    key: string,
    defaultValue: T
) {
    const cxt = cxtCache[key];
    let CurCxt: Cxt<T>;
    if (cxt) {
        CurCxt = cxt;
    } else {
        CurCxt = new Cxt<T>(key, defaultValue);
    }
    // 注意这里需要返回React.ReactNode的数据格式
    return (Child: React.FunctionComponent<any>) => (props: any)=>(
        <CurCxt.Provider>
            <Child {...props} />
        </CurCxt.Provider>
    )
}