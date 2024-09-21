import { COMMIT_ORG, DEL_ORG, GET_ORG, GET_ORGS } from "@/graphgql/org"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TBaseOrganization, TOrgQuery, TOrgsQuery } from "@/utils/types";
import { useMutation, useQuery } from "@apollo/client"
import { message } from "antd";

// 获取一组部门，数组形式
export const useOrganizations = (pageNum: number = 1, pageSize: number = DEFAULT_PAGE_SIZE) => {
    const { loading, data, refetch } = useQuery<TOrgsQuery>(GET_ORGS, {
        variables: {
            page: {
                pageNum,
                pageSize,
            }
        },
    });
    return {
        loading,
        refetch,
        page: data?.getOrganizations.page,
        data: data?.getOrganizations.data
    }
}

// 获取部门的具体信息
export const useOrganization = (id: string) => {
    const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
        variables: {
            id,
        },
    });
    return {
        loading,
        data: data?.getOrganizationInfo.data
    }
}

// 编辑部门信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEditInfo = (): [handleEdit: any, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_ORG);
    const handleEdit = async (id: string, params: TBaseOrganization) => {
        const res = await edit({
            variables: {
                id,
                params
            }
        })
        message.info(res.data.commitOrganizationInfo.message);
    }
    return [handleEdit, loading];
}

// 删除部门信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteOrg = (): [delHandler: any, loading: boolean] => {
    const [del, { loading }] = useMutation(DEL_ORG);

    const delHandler = async (id: number, callback: () => void) => {
    const res = await del({
        variables: {
            id,
        },
    }); 
    if (res.data.deleteOrganization.code === 200) {
        message.success(res.data.deleteOrganization.message);
        callback();
        return;
    }
    message.error(res.data.deleteOrganization.message);
    };

    return [delHandler, loading];
};