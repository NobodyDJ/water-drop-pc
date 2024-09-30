import { LOCAL_CURRENT_ORG } from "./constants";

// 确保在组件渲染之前就获取到了默认值
export const getCurrentOrg = () => {
    try {
        const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '{}');
        return res;
    } catch {
        return { value: '', label: '' };
    }
};