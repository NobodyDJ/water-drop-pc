import style from './index.module.less';
import { Modal, Result, Row, Space, Typography } from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import { useEditCardInfo, useLazyCards } from '@/services/card';
import { useMemo, useState } from 'react';
import { useProductInfo } from '@/services/product';
import CourseSearch from '@/components/CourseSearch';
import _ from 'lodash';
import { CreditCardOutlined } from '@ant-design/icons';
import { getCardName } from '@/utils/constants';

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
    const { data: cards, loading: getCardsLoading, getCards } = useLazyCards();
    console.log('product', product);
    const newCards = useMemo(()=> _.unionBy(product?.cards, cards, 'id'), [cards, product?.cards]);
    const onOkHandler = () => {
        edit(id, {

        })
    }
    const onSelectedHandler = (courseId: string) => {
        getCards(courseId);
    }
    return (
        <div className={style.container}>
            <Modal
                title="绑定消费卡"
                width="900"
                open
                onOk={onOkHandler}
                onCancel={() => onClose(false)}
            >
                <Row justify="end">
                    <CourseSearch onSelected={onSelectedHandler}/>
                </Row>
                <Row justify="center" className={style.content}>
                    {newCards.length === 0 &&
                        <Result
                        status="warning"
                        title="请搜索课程并选择对应的消费卡"
                        />
                    }
                    <CheckCard.Group
                        multiple
                        onChange={(value) => {
                            setSelectedCards(value as string[]);
                        }}
                        loading={editLoading || getProductLoading || getCardsLoading}
                        value={selectedCards}
                    >
                        {/* 卡片列表展示 */}
                        {
                            newCards.map((item) => (
                                <CheckCard
                                    key={item.id}
                                    value={item.id}
                                    size='small'
                                    avatar={<CreditCardOutlined />}
                                    title={
                                        (
                                            <>
                                                <Space>
                                                    <Typography.Text
                                                        ellipsis
                                                        className={style.name}
                                                    >
                                                        {item.course?.name}
                                                    </Typography.Text>
                                                    {getCardName(item.type)}
                                                </Space>
                                                <Row>
                                                <div>
                                                    {item.name}
                                                </div>
                                                </Row>
                                               
                                                
                                            </>
                                        )
                                    }
                                    description={
                                        (
                                            <Space>
                                                <span>
                                                    次数：
                                                    {item.time}
                                                </span>
                                                <span>
                                                    有效期：
                                                    {item.validityDay}
                                                </span>
                                            </Space>
                                        )
                                    }
                                >

                                </CheckCard>
                            ))
                        }
                    </CheckCard.Group>
                </Row>
            </Modal>
        </div>
    );
};

export default ConsumerCard;
