import style from './index.module.less';
import { Modal, Row } from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import { useEditCardInfo } from '@/services/card';
import { useState } from 'react';
import { useProductInfo } from '@/services/product';
import CourseSearch from '@/components/CourseSearch';

/**
*   绑定消费卡
*/

interface IProps{
    id?: string; // 商品id
    onClose: (isReload: boolean) => void;
}

const ConsumerCard = ({
    id,
    onClose
}: IProps) => {
    const [ selectedCards, setSelectedCards ] = useState<string[]>([]); // 选中的消费卡id数组
    const [edit, editLoading] = useEditCardInfo();
    const { data: product, loading: getProductLoading } = useProductInfo(id || '');
    console.log('product', product);
    const onOkHandler = () => {
        edit(id, {

        })
    }
    const onSelectedHandler = () => {
        
    }
    return (
        <div className={style.container}>
            <Modal
                title="绑定消费卡"
                width="900"
                open
                onOk={onOkHandler}
                onClose={() => onClose(false)}
            >
                <Row justify="end">
                    <CourseSearch onSelected={onSelectedHandler}/>
                </Row>
                <Row justify="center">
                    <CheckCard.Group
                        multiple
                        onChange={(value) => {
                            setSelectedCards(value as string[]);
                        }}
                        loading={editLoading || getProductLoading}
                        value={selectedCards}
                    >
                    </CheckCard.Group>
                </Row>
            </Modal>
        </div>
    );
};

export default ConsumerCard;
