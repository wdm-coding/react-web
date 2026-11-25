import {
  ActionType,
  ProTable,
  type ProColumns
} from '@ant-design/pro-components'
import { useRef } from 'react'
import accountApi from '@/api/account'
import { InsUserItem } from '@/api/types/account'
import { getEnumLabel } from '@/pages/Manage/Enum/index'
import useTableScroll from '@/hooks/useTableScroll'
import styles from '../index.module.scss'

const ApplyJoinList = () => {
  const actionRef = useRef<ActionType>(null)
  const { scroll, updateScrollY } = useTableScroll(1300)
  // 查询申请加入机构列表
  const fetchApplyJoinList = async (params: any) => {
    const { current = 1, pageSize = 10, userName } = params
    const { code, data } = await accountApi.getInsUserList({
      pageNum: current,
      pageSize,
      type: '0',
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
      width: 220,
      search: false
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
      width: 160,
      fieldProps: { placeholder: '请输入' }
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      width: 120,
      search: false,
      render: (_, row) => getEnumLabel('approvalStatusEnum', row.status)
    },
    {
      title: '不通过说明',
      dataIndex: 'refuseReason',
      width: 200,
      search: false,
      render: (_, row) => row.refuseReason || '-'
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      width: 160,
      search: false,
      render: (_, row) => row.applyTime || '-'
    },
    {
      title: '审核时间',
      dataIndex: 'examineTime',
      width: 160,
      search: false,
      render: (_, row) => row.examineTime || '-'
    }
  ]
  return (
    <div className={styles.tableWrapper}>
      <ProTable<InsUserItem>
        actionRef={actionRef}
        name='applyJoinList'
        rowKey='id'
        columns={columns}
        request={(params, filters) =>
          fetchApplyJoinList({ ...params, ...filters })
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
export default ApplyJoinList
