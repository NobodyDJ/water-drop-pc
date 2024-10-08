import { COMMIT_CARD, DELETE_CARD, GET_CARDS } from "@/graphgql/card";
import { ICard, TBaseCard, TCardQuery } from "@/utils/types";
import { useMutation, useQuery } from "@apollo/client";
import { App } from "antd";

// 获取消费卡信息
export const useCards = (id: string) => {
    const { data , loading, refetch } = useQuery<TCardQuery>(GET_CARDS, {
        variables: {
            courseId: id,
        },
    });
    return {
        data: data?.getCards.data as unknown as ICard[],
        loading,
        refetch
    }
}

// 编辑消费卡信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEditCardInfo = (): [handleEdit: any, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_CARD);
    const { message } = App.useApp();
    const handleEdit = async (id: string, courseId: string, params: TBaseCard, callback: ()=> void) => {
        const res = await edit({
            variables: {
                params,
                courseId,
                id,
            }
        })
        if (res.data.commitCardInfo.code === 200) {
            message.success(res.data.commitCardInfo.message);
            callback()
            return;
        }
        message.error(res.data.commitCardInfo.message);
    }
    return [handleEdit, loading];
}

// 删除消费卡信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteCard = (): [delHandler: any, loading: boolean] => {
    const [del, { loading }] = useMutation(DELETE_CARD);
    const { message } = App.useApp();
    const delHandler = async (id: number, callback: () => void) => {
    const res = await del({
        variables: {
            id,
        },
    }); 
    if (res.data.deleteCard.code === 200) {
        message.success(res.data.deleteCard.message);
        callback();
        return;
    }
    message.error(res.data.deleteCard.message);
    };

    return [delHandler, loading];
};