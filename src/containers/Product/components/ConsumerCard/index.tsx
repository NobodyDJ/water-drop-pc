import style from './index.module.less';
import { Drawer } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ICard } from '@/utils/types';
import { getColumns } from './constants';
import { useCards, useDeleteCard, useEditCardInfo } from '@/services/card';
import _ from 'lodash';

/**
*   关联消费卡
*/

interface IProps{
    id?: string;
    onClose: (isReload: boolean) => void;
}

const ConsumerCard = ({
    id,
    onClose
}: IProps) => {
    const { data: cards, loading, refetch } = useCards(id || '');
    const [handleEdit, editLoading] = useEditCardInfo();
    const [delHandler, delLoading] = useDeleteCard();
    const onDeleteHandler = (id: string) => {
        delHandler(id, refetch);
    }
    const onSaveHandler = (data: ICard) => {
        handleEdit(
            data.id === 'new' ? '' : data.id,
            id,
            { ...(_.omit(data, ['index', 'id'])) },
            refetch
        )
    }
    return (
        <div className={style.container}>
            <Drawer
                title="关联消费卡"
                width="70vw"
                open
                onClose={() => onClose(false)}
            >
                {/* 注意这里确定表格每一行的数据字段很重要 */}
                <EditableProTable<ICard>
                    headerTitle="请管理该课程的消费卡"
                    rowKey="id"
                    value={cards}
                    loading={loading || editLoading || delLoading}
                    columns={getColumns((id: string) => onDeleteHandler(id))}
                    editable={{
                        onSave: async (key, row) => {
                            onSaveHandler(row);
                        },
                        onDelete: async (key) => {
                            onDeleteHandler(key as string);
                        }

                    }}
                    recordCreatorProps={{
                        // 增加一个当前行
                        record: ()=>(
                            {
                                id: 'new', // 设置一个唯一key值必须要有值
                                name: '',
                                type: 'time',
                                time: 0,
                                validityDay: 0,
                            }
                        )
                    }}
                />
            </Drawer>
        </div>
    );
};

export default ConsumerCard;
