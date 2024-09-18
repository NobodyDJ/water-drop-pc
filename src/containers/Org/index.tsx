import { useState, useEffect } from 'react';
import styles from './index.module.less';
import {
    PageContainer,
    ProList,
  } from '@ant-design/pro-components';
  import { Button } from 'antd';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import EditOrg from './components';
import { useOrganizations } from '@/services/org';

/**
*   门店信息
*/
const Org = () => {
    const [state, setState] = useState();
    const { loading, data, page, refetch } = useOrganizations();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    const addInfoHandler = () => {
        
    }

    return (
        <div className={styles.container}>
            <PageContainer
                loading={loading}
                header={{
                    title: '门店管理',
                }}
                extra={[
                    <Button key="1" type="primary" onClick={addInfoHandler}></Button>
                ]}
            >
            <ProList<any>
                pagination={{
                    defaultPageSize: DEFAULT_PAGE_SIZE,
                    showSizeChanger: false,
                    total: page?.total,
                    onChange: onPageChangeHandler,
                }}
                showActions="always"
                rowSelection={{}}
                grid={{ gutter: 10, column: 2 }}
                metas={{
                    title: {
                        dataIndex: 'name',
                    },
                    subTitle: {},
                    type: {},
                    avatar: {
                        dataIndex: 'logo'
                    },
                    content: {
                        dataIndex: 'address',
                    },
                    actions: {
                        cardActionProps: 'extra',
                    },
                }}
                dataSource={dataSource}
            />
                {/* 新建和编辑的抽屉 */}
                {showEdit && (
                    <EditOrg
                        id={curId}
                        onClose={onCloseHandler}
                    />
                )}
            </PageContainer>
        </div>
    );
};

export default Org;
