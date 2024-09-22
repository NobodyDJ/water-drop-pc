import { useOrganizations } from '@/services/org';
import { Select } from 'antd/lib';
import { Space } from 'antd';

/**
*   门店选择器
*/
const OrgSelect = () => {
    const { data, refetch } = useOrganizations(1, 10, true)
    const onSearchHandler = (name: string) => {
        refetch({
            name,
        })
    }
    return (
        <Space>
            选择门店：
            <Select
                style={{ width: 200 }}
                placeholder="请选择门店"
                showSearch
                filterOption={false}
                onSearch={onSearchHandler}
            >
                {data?.map((item) => (
                    <Select.Option
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        </Space>
    );
};

export default OrgSelect;
