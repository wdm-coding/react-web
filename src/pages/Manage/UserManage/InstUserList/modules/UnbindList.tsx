import {
  ActionType,
  ProTable,
  type ProColumns
} from '@ant-design/pro-components'
import { useRef } from 'react'
import accountApi from '@/api/account'
import { InsUserItem } from '@/api/types/account'
import useTableScroll from '@/hooks/useTableScroll'
import styles from '../index.module.scss'

const UnbindList = () => {
  const actionRef = useRef<ActionType>(null)
  const { scroll, updateScrollY } = useTableScroll(900)
  // 查询解绑记录列表
  const fetchUnbindList = async (params: any) => {
    const { current = 1, pageSize = 10, userName } = params
    const { code, data } = await accountApi.getInsUserList({
      pageNum: current,
      pageSize,
      type: '-3',
      ...(userName ? { userName } : {})
    })
    const list = data?.content || []
    updateScrollY(list.length)
    return {
      success: code === 20000,
      data: list,
      total: Number(data?.totalElements) || 0
    }
  }
  const columns: ProColumns<InsUserItem>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 80,
      search: false
    },
    {
      title: '用户账号（证件号码）',
      dataIndex: 'idNumber',
      width: 300,
      search: false
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
      width: 240,
      fieldProps: { placeholder: '请输入' }
    },
    {
      title: '解绑时间',
      dataIndex: 'unbindTime',
      width: 200,
      search: false,
      render: (_, row) => row.unbindTime || '-'
    }
  ]
  return (
    <div className={styles.tableWrapper}>
      <ProTable<InsUserItem>
        actionRef={actionRef}
        name='unbindList'
        rowKey='id'
        columns={columns}
        request={(params, filters) =>
          fetchUnbindList({ ...params, ...filters })
        }
        scroll={scroll}
        size='small'
        bordered
        options={false}
        search={{
          labelWidth: 'auto'
        }}
        pagination={{
          defaultPageSize: 10,
          totalBoundaryShowSizeChanger: 10
        }}
        toolBarRender={false}
      />
    </div>
  )
}
export default UnbindList
