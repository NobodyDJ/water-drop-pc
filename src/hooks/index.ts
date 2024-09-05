import { useEffect } from "react"

// 根据页面显示适应的标题
export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [])
};