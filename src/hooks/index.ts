import { getRouteByKey, routes } from "@/routes/menus";
import { useEffect, useMemo } from "react"
import { matchPath, useLocation, useNavigate } from "react-router-dom";

// 根据页面显示适应的标题
export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [])
};

// 通用页面跳转
export const useGoTo = () => {
    const nav = useNavigate();
    const back = () => nav(-1);
    const go = (
        pageKey?: string,
        params?: Record<string, string | number>
    ) => {
        if (!pageKey) {
            nav('/');
            return
        }
        const route = getRouteByKey(pageKey);
        if (route && route.path) {
            if (!params) {
                nav(`/${route.path}`);
                return
            }
            // /page/:id params: { id: 1 } => /page/1
            // exp表示第一个匹配到的表达式 如/:id
            // exp1表示匹配到的URL参数名称，如:id
            const url = route.path.replace(
            /\/:(\w+)/g,
            (exp: string, exp1: string) => `/${params[exp1]}`,
            );
            nav(`/${url}`);
        }
    }
    return { back, go };
}

// 获取匹配当前路由的URL
export const useMatchedRoute = () => {
    const r = useLocation();
    const route = useMemo(() => routes.find((item) => matchPath(item.path, r.pathname)), [r.pathname]);

    return route;
}