import { COMMIT_PRODUCT, DEL_PRODUCT, GET_PRODUCT, GET_PRODUCTS } from "@/graphgql/product";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TBaseProduct, TProductQuery, TProductsQuery } from "@/utils/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { App } from "antd";
import { useMemo } from "react";

// 获取一组商品，数组形式
export const useProducts = (
    pageNum: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
) => {
    const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
        skip: true,
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    });

    const refetchHandler = async (
        params: {
            name?: string,
            pageSize?: number,
            current?: number
        }
    ) => {
        const { data: res, errors } = await refetch({
            name: params.name || '',
            page: {
                pageNum: params.current || 1,
                pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
            }
        });
        if (errors) {
            return {
                success: false
            }
        }
        return {
            page: res?.getProducts.page.total,
            data: res?.getProducts.data,
            success: true
        }
    }
    return {
        loading,
        refetch: refetchHandler,
        page: data?.getProducts.page,
        data: data?.getProducts.data
    }
}

// 编辑商品信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEditProductInfo = (): [handleEdit: any, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_PRODUCT);
    const { message } = App.useApp();
    const handleEdit = async (id: string, params: TBaseProduct, callback: ()=> void) => {
        const res = await edit({
            variables: {
                id,
                params
            }
        })
        if (res.data.commitProductInfo.code === 200) {
            message.success(res.data.commitProductInfo.message);
            callback();
            return;
        }
        message.error(res.data.commitProductInfo.message);
    }
    return [handleEdit, loading];
}

// 获取商品信息
export const useProduct = () => {
    // 在组件渲染的时候不立即发送请求。
    // 而是通过获取get方法，通过点击调用请求方法
    const [get, { loading }] = useLazyQuery(GET_PRODUCT);
    // id不发生变化调用接口不会发生
    const getProduct = async (id: string) => {
        const res = await get({
            variables: {
                id,
            },
        });
        return res.data.getProductInfo.data
    };
    return {
        loading,
        getProduct,
    }
}

// 获取商品信息 及时获取商品信息
export const useProductInfo = (id: string) => {
    const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
        skip: !id,// id不存在跳过请求
        variables: {
            id,
        },
    });
    // 对返回的数据进行数组的包裹
    const newData = useMemo(() => {
        return {
            ...data?.getProductInfo.data,
            coverUrl: [{ url: data?.getProductInfo.data.coverUrl }],
            bannerUrl: [{ url: data?.getProductInfo.data.bannerUrl }]
        }
    }, [data]);
    return {
        data: data?.getProductInfo.data ? newData : undefined,
        loading,
        refetch
    }
}

// 删除商品信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteProduct = (): [delHandler: any, loading: boolean] => {
    const [del, { loading }] = useMutation(DEL_PRODUCT);
    const { message } = App.useApp();
    const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
        variables: {
            id,
        },
    }); 
    if (res.data.deleteProduct.code === 200) {
        message.success(res.data.deleteProduct.message);
        setTimeout(() => {
            callback();
        }, 1000)
        return;
    }
        message.error(res.data.deleteProduct.message);
    };

    return [delHandler, loading];
};