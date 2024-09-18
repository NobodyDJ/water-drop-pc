import { GET_ORGS } from "@/graphgql/org"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TOrgsQuery } from "@/utils/types";
import { useQuery } from "@apollo/client"

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