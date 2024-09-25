import { PageContainer, ProTable } from '@ant-design/pro-components';
import { COLUMNS } from './constant';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { ICourse } from '@/utils/types';
import { useCourses } from '@/services/course';

/**
*
*/
const Course = () => {
    const { data, refetchHandler } = useCourses();
    return (
        <PageContainer
            header={{
                title: '当前门店下开设的课程'
            }}
        >
            <ProTable<ICourse>
                columns={COLUMNS}
                dataSource={data}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE
                }}
                request={async (
                    params: {
                        name: string,
                        pageSize?: number,
                        current?: number
                    }
                ) => {
                    refetch(params)
                }}
            />
        </PageContainer>
    );
};

export default Course;
