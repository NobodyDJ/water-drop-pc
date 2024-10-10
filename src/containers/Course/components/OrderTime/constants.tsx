/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrderTime } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';

export const getColumns = (onDeleteHandler: (key: number) => void): ProColumns[] => [
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
    render: (text: any) => {
      const date = dayjs(text);
      return date.isValid() ? date.format('HH:mm:ss') : text;
    }
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
    render: (text: any) => {
      const date = dayjs(text);
      return date.isValid() ? date.format('HH:mm:ss') : text;
    }
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
          size="small"
          onClick={() => {
            action?.startEditable?.(record.key)
          }}
        >
          编辑
        </Button>
        <Popconfirm
          title="提醒"
          description="确认要删除吗"
          onConfirm={ () => onDeleteHandler(record.key) }
        >
          <Button
            key="delete"
            type="link"
            size="small"
          >
            删除
          </Button>
        </Popconfirm>
      </Space>
    ]
  }
]

export const isWorkDay = (day: string) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[] | undefined): number => {
  const keys = orderTime?.map((item) => item.key) || [];
  if (keys.length === 0) {
    return 0;
  }
  return Math.max(...keys);
};