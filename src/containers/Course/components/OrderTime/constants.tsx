import { ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';

export const getColumns = (onDeleteHandler: () => void): ProColumns[] => [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    width: 150,
    align: 'center',
    render: (text, record, _, action) => [
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={() => {
            action?.startEditable?.(record.key)
          }}
        >
          编辑
        </Button>
        <Popconfirm
          title="提醒"
          description="确认要删除吗"
          onConfirm={()=>onDeleteHandler()}
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