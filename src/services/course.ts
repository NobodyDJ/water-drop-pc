import { GET_COURSES } from "@/graphgql/course";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TCoursesQuery } from "@/utils/types";
import { useQuery } from "@apollo/client";

// 获取一组部门，数组形式
export const useCourses = (
    pageNum: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
) => {
    const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    });
    const refetchHandler = async (pn = 1, ps = DEFAULT_PAGE_SIZE) => {
        const {data: res, errors} = await refetch({
            page: {
                pageNum: pn,
                pageSize: ps,
            }
        });
        if (errors) {
            return {
                success: false
            }
        }
        return {
            page: res?.getCourses.page,
            data: res?.getCourses.data,
            success: true
        }
    }
    return {
        loading,
        refetchHandler,
        page: data?.getCourses.page,
        data: data?.getCourses.data
    }
}