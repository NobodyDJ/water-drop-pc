import { GET_STUDENTS } from "@/graphgql/student";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TStudentQuery } from "@/utils/types";
import { useQuery } from "@apollo/client";

// 获取一组学员信息，数组形式
export const useStudents = (
    pageNum: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
) => {
    const { loading, data, error, refetch } = useQuery<TStudentQuery>(GET_STUDENTS, {
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    });
    return {
        loading,
        error,
        refetch,
        page: data?.getStudents.page,
        data: data?.getStudents.data
    }
}