import { useCourseInfo, useEditCourseInfo } from "@/services/course";
import { DAYS, IDay, IOrderTime, IWeekCourse } from "@/utils/types";
import { useMemo } from "react";
import { isWorkDay } from "./constants";

export const useOrderTime = (id: string, currentDay: IDay) => {
    // 用于渲染到预约课程的时间段列表
    // orderTime相关逻辑操作进行封装处理
    // data指的是课程
    const { data, loading: loadingCourse, refetch } = useCourseInfo(id);
    const [edit, editLoading] = useEditCourseInfo();

    const orderTime = useMemo(() => {
        const res = (data?.reducibleTime || []).find((item) => item.week === currentDay.key)?.orderTime as IOrderTime[];
        return res
    },[data, currentDay])
    const onDeleteHandler = (key: number) => {
        const orderTimeArr = orderTime.filter((item) => item.key !== key);
        onSaveHandler(orderTimeArr);
    }
    const onSaveHandler = (ot: IOrderTime[]) => {
        const rt = [...(data?.reducibleTime || [])];
        // 确定是周几的课程节次
        const index = rt.findIndex((item) => item.week === currentDay.key);
        if (index > -1) {
            // 更新
            rt[index] = {
                week: currentDay.key,
                orderTime: ot,
            }
        } else {
            // 新增
            rt.push({
                week: currentDay.key,
                orderTime: ot,
            })
        }
        edit(id, {
            reducibleTime: rt
        }, ()=> refetch())
    }
    // 全工作日同步
    const allWorkDaySyncHandler = () => {
        const rt: IWeekCourse[] = [];
        DAYS.forEach((item) => {
            if (isWorkDay(item.key)) {
                rt.push({
                    week: item.key,
                    orderTime
                })
            }
        })
        edit(id, {
            reducibleTime: rt
        }, () => refetch());
    }
    const allWeekSyncHandler = () => {
        const rt: IWeekCourse[] = [];
        DAYS.forEach((item) => {
            rt.push({
                week: item.key,
                orderTime
            })
        })
        edit(id, {
            reducibleTime: rt
        }, () => refetch());
    }
    return {
        orderTime,
        loadingCourse,
        editLoading,
        onDeleteHandler,
        onSaveHandler,
        allWorkDaySyncHandler,
        allWeekSyncHandler
    }
}