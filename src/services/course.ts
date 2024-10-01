import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from "@/graphgql/course";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TBaseCourse, TCourseQuery, TCoursesQuery } from "@/utils/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { App } from "antd";

// 获取一组课程，数组形式
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
export const useEditCourseInfo = (): [handleEdit: any, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_COURSE);
    const { message } = App.useApp();
    const handleEdit = async (id: string, params: TBaseCourse, callback: ()=> void) => {
        const res = await edit({
            variables: {
                id,
                params
            }
        })
        if (res.data.commitCourseInfo.code === 200) {
            message.success(res.data.commitCourseInfo.message);
            callback()
            return;
        }
        message.error(res.data.commitCourseInfo.message);
    }
    return [handleEdit, loading];
}

// 获取课程信息
export const useCourse = () => {
    // 在组件渲染的时候不立即发送请求。
    // 而是通过获取get方法，通过点击调用请求方法
    const [get, { loading }] = useLazyQuery(GET_COURSE);
    // id不发生变化调用接口不会发生
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

// 获取课程信息 及时获取课程信息
export const useCourseInfo = (id: string) => {
    const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
        variables: {
            id,
        },
    });
    return {
        data: data?.getCourseInfo.data,
        loading,
        refetch
    }
}