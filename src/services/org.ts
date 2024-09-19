import { GET_ORG, GET_ORGS } from "@/graphgql/org"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TOrgQuery, TOrgsQuery } from "@/utils/types";
import { useQuery } from "@apollo/client"

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