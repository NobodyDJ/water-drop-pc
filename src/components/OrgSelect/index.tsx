import { useOrganizations } from '@/services/org';
import { Select } from 'antd/lib';
import { Space } from 'antd';
import _ from 'lodash';
import { useUserContext } from '@/hooks/userHooks';
import { LOCAL_CURRENT_ORG } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import { getCurrentOrg } from '@/utils';

/**
*   门店选择器
*/

// 确保在组件渲染之前就获取到了默认值当前组织

const OrgSelect = () => {
    const { data, refetch } = useOrganizations(1, 10, true);
    const { store, setStore } = useUserContext();
    const { go } = useGoTo();
    
    const [curOrg, setCurOrg] = useState<{ value: string; label: string }>({ value: '', label: '' });

    useEffect(() => {
        const org = getCurrentOrg();
        if (org.value) {
            setStore({ currentOrg: org.value });
            setCurOrg(org);  // 初始化时设置当前组织
        } else {
            go(ROUTE_KEY.NO_ORG);
        }
    }, []);

    const onSearchHandler = _.debounce((name: string) => {
        refetch({ name });
    }, 500);

    const onChangeHandler = (val: { value: string; label: string }) => {
        setStore({ ...store, currentOrg: val.value });
        localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val));  // 记录上次选中的门店
        setCurOrg(val);  // 更新当前选择的门店
    };

    return (
        <Space>
            选择门店：
            <Select
                style={{ width: 200 }}
                placeholder="请选择门店"  // 在 value 为 undefined 时显示
                value={curOrg.value ? curOrg : undefined}  // 如果 curOrg.value 为空，显示 placeholder
                showSearch
                labelInValue  // 用于解决分页请求时，数据不在第一页导致显示 id 的问题
                filterOption={false}
                onSearch={onSearchHandler}
                onChange={onChangeHandler}
            >
                {data?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        </Space>
    );
};

export default OrgSelect;
