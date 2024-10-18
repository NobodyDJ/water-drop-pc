import { Select } from 'antd';
import { useProductType } from '@/services/product';

interface IProps{
    value?: string;
    onChange?: (val: string) => void;
}

/**
*   商品分类选择
*/
const TypeSelect = ({
    value,
    onChange
}: IProps) => {
    const { data } = useProductType();
    const onChangeHandler = (val: string) => {
        onChange?.(val);
    }
    return (
        <Select
            placeholder="请选择分类"
            value={value}
            onChange={onChangeHandler}
        >
        {data?.map((item) => (
            <Select.Option
                key={item.key}
                value={item.key}
            >
            {item.title}
            </Select.Option>
        ))}
        </Select>
    );
};

export default TypeSelect;
