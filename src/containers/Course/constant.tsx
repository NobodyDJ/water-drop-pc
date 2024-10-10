import { ICourse, IProps } from "@/utils/types";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";

export const getColumns: ({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler
}: IProps) => ProColumns<ICourse, 'text'>[] = ({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler
}) => [
  {
    title: '课程标题',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '限制人数',
    dataIndex: 'limitNumber',
    width: 75,
    search: false,
  },
  {
    title: '持续时长',
    dataIndex: 'duration',
    width: 75,
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    width: 220,
    align: 'center',
    render: (text, entity) => [
      <Space key="space" size="small">
        <Button
          key="edit"
          type="link"
          size="small"
          onClick={() => onEditHandler(entity.id)}
        >
          编辑
        </Button>
        <Button
          key="orderTime"
          type="link"
          size="small"

          onClick={() => onOrderTimeHandler(entity.id)}
        >
          可约时间
        </Button>
        <Button
          key="card"
          type="link"
          size="small"
          onClick={() => onCardHandler(entity.id)}
        >
          关联消费卡
        </Button>
      </Space>
    ]
  },
]