import { ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space } from "antd";

const CARD_TYPE = {
    TIME: 'time',
    DURATION: 'duration'
}

export const getColumns = (onDeleteHandler: (id: string) => void): ProColumns[] => [
    {
        title: '序号',
        dataIndex: 'key',
        width: 50,
        editable: false,
        align: 'center',
        // 渲染样式
        render: (text, record, index)=> index + 1
    },
    {
        title: '名称',
        dataIndex: 'name',
        align: 'center',
        width: 200,
    },
    {
        title: '有效期（天）',
        dataIndex: 'validityDay',
        valueType: 'digit',
        width: 110,
        align: 'center',
    },
    {
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        width: 120,
        align: 'center',
        request: async () => [
          {
            value: CARD_TYPE.TIME,
            label: '次卡',
          },
          {
            value: CARD_TYPE.DURATION,
            label: '时长卡',
          },
        ],
    },
    {
        title: '次数',
        dataIndex: 'time',
        valueType: 'digit',
        width: 100,
        align: 'center',
    },
    {
        title: '操作',
        valueType: 'option',
        dataIndex: 'id',
        width: 150,
        align: 'center',
        render: (text, record, _, action) => [
            <Space key="space">
                <Button
                    key="edit"
                    type="link"
                    onClick={() => {
                        action?.startEditable?.(record.id || '')
                    }}
                >
                    编辑
                </Button>
                <Popconfirm
                    key="popconfirm"
                    title="提醒"
                    description="确认要删除吗"
                    onConfirm={ () => onDeleteHandler(record.id) }
                >
                    <Button
                        key="delete"
                        type="link"
                    >
                        删除
                    </Button>
                </Popconfirm>
            </Space>
        ]
    }
]