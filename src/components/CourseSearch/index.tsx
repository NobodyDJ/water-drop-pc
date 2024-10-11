import { useCourseSearch } from '@/services/course';
import style from './index.module.less';
import { Select } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

interface IProps{
    onSelected: (val: string) => void;
}

/**
*   课程选择器
*/
const CourseSearch = ({
    onSelected
}: IProps) => {
    const { loading, data, search } = useCourseSearch();
    useEffect(() => {
        search('');
    }, []);
    const onSearchHandler = _.debounce(
        (name: string) => {
            search(name);
        },500)
    const onChangeHandler = (courseId: string) => {
        onSelected(courseId);
    }
    return (
        <Select
            className={style.select}
            showSearch
            placeholder="请搜索课程"
            onSearch={onSearchHandler}
            onChange={onChangeHandler}
            filterOption={false}
            loading={loading}
        >
            {
                data?.map((item) =>
                    <Select.Option
                        key={item.id}
                        value={item.id}>
                        {item.name}
                    </Select.Option>)
            }
        </Select>
    );
};

export default CourseSearch;
