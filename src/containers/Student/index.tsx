import style from './index.module.less';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Pagination, Space } from 'antd';
import { useStudents } from '@/services/student';
import { IStudent } from '@/utils/types';

/**
*   学员管理
*/
const Student = () => {
    const {
        loading,
        refetch,
        page,
        data
    } = useStudents();

    const onPageChangeHandler = (pageNum: number, pageSize: number) => {
        refetch({
            page: {
                pageNum,
                pageSize
            }
        })
    }

    return (
        <div className={style.container}>
            <PageContainer
                loading={loading}
                header={{
                    title: '学员管理'
                }}
            >
                <Card
                >
                    {
                        data?.map((item: IStudent) => {
                            return (
                                <Card
                                    className={style.card}
                                    key={item.id}
                                    hoverable
                                    cover={
                                        (<div
                                            className={style.avatar}
                                            style={{
                                                backgroundImage: `url(${item.avatar || 'https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/noAvatar.jpg'})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center'
                                            }}
                                        >

                                        </div>)
                                    }
                                >
                                    <Card.Meta
                                        title={item.name || '无名氏'}
                                        description={<Space>{[item.account || '无账号', item.tel || '无手机号']}</Space>}
                                    />
                                </Card>
                            )
                        })
                    }
                    <div className={style.page}>
                        <Pagination
                            pageSize={page?.pageSize}
                            current={page?.pageNum}
                            total={page?.total}
                            onChange={onPageChangeHandler}
                        />
                    </div>
                </Card>
            </PageContainer>
        </div>
    );
};

export default Student;
