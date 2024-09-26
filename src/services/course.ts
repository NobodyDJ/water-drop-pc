import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from "@/graphgql/course";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TBaseCourse, TCoursesQuery } from "@/utils/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { message } from "antd";

// 获取一组部门，数组形式
export const useCourses = (
    pageNum: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
) => {
    const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
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
            page: res?.getCourses.page.total,
            data: res?.getCourses.data,
            success: true
        }
    }
    return {
        loading,
        refetch: refetchHandler,
        page: data?.getCourses.page,
        data: data?.getCourses.data
    }
}

// 编辑部门信息
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEditInfo = (): [handleEdit: any, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_COURSE);
    const handleEdit = async (id: string, params: TBaseCourse, callback: (isReload: boolean)=> void) => {
        const res = await edit({
            variables: {
                id,
                params
            }
        })
        if (res.data.commitCourseInfo.code === 200) {
            message.success(res.data.commitCourseInfo.message);
            callback(true)
            return;
        }
        message.error(res.data.commitCourseInfo.message);
    }
    return [handleEdit, loading];
}

// 获取部门信息
export const useCourse = () => {
    // const { data, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
    //     skip: true
    // });
    const [get, { loading }] = useLazyQuery(GET_COURSE);

    const getCourse = async (id: string) => {
        const res = await get({
            variables: {
                id,
            },
        });
        return res.data.getCourseInfo.data
    };
    return {
        loading,
        getCourse,
    }
}