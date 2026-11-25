import { ProColumns, ProTable } from '@ant-design/pro-components'
import { JoinListItem } from '@/api/types/approvalManage'
import { approvalStatusEnum, getEnumLabel } from '../../Enum'
import useTableScroll from '@/hooks/useTableScroll'
import ApprovalManageApi from '@/api/approvalManage'
const JoinList = ({ type }: { type: 'todo' | 'complete' }) => {
  const { scroll, updateScrollY } = useTableScroll()
  const columns: ProColumns<JoinListItem>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 80,
      search: false
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
      width: 160,
      fieldProps: { placeholder: '请输入' }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 180,
      search: false
    },
    {
      title: '处理状态',
      dataIndex: 'handleStatus',
      width: 120,
      search: false,
      render: (_, row) =>
        getEnumLabel('changeStatusEnum', row.approvalStatus) || '-'
    },
    {
      // 搜索区展示为「审核状态」，不在表格中显示
      title: '审核状态',
      dataIndex: 'approvalStatus',
      valueType: 'select',
      hideInTable: true,
      fieldProps: {
        options:
          type === 'todo'
            ? [
                {
                  label: '申请中',
                  value: 0
                },
                {
                  label: '待同意',
                  value: 2
                }
              ]
            : [
                {
                  label: '全部',
                  value: '99'
                },
                ...approvalStatusEnum.map((item) => ({
                  label: item.label,
                  value: Number(item.value)
                }))
              ]
      }
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      width: 180,
      search: false,
      sorter: true
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: () => []
    }
  ]
  const getStatus = (approvalStatus?: string | number) => {
    if (type === 'todo') {
      return {
        ...(approvalStatus || approvalStatus === 0
          ? { approvalStatus: Number(approvalStatus) }
          : {}),
        ...(approvalStatus || approvalStatus === 0
          ? { state: Number(approvalStatus) }
          : {})
      }
    } else {
      if (approvalStatus !== 0 && !approvalStatus) {
        return {}
      } else {
        return {
          ...(approvalStatus === '99'
            ? { approvalStatus: [5, -1, -2, -3, -4] }
            : { approvalStatus: [Number(approvalStatus)] }),
          ...(approvalStatus === '99'
            ? { state: [5, -1, -2, -3, -4] }
            : { state: [Number(approvalStatus)] })
        }
      }
    }
  }
  const fetchList = async (params?: any) => {
    const extraParams = getStatus(params?.approvalStatus)
    const ApiFun =
      type === 'todo'
        ? ApprovalManageApi.getJoinTodoList
        : ApprovalManageApi.getJoinCompletedList
    const {
      current = 1,
      pageSize = 10,
      userName,
      applyTime = 'descend'
    } = params
    const { code, data } = await ApiFun({
      pageNum: current,
      pageSize,
      sortField: 'updatedTime',
      sortDirection: applyTime === 'descend' ? 'DESC' : 'ASC',
      ...(userName ? { userName } : {}),
      ...extraParams
    })
    const list = data?.content || []
    updateScrollY(list.length)
    return {
      success: code === 20000,
      data: list,
      total: Number(data?.totalElements) || 0
    }
  }
  return (
    <ProTable<JoinListItem>
      name={type === 'todo' ? 'todoJoinApplyList' : 'completeJoinApplyList'}
      rowKey='id'
      columns={columns}
      request={(params, filters) => fetchList({ ...params, ...filters })}
      rowSelection={{ columnWidth: 50 }}
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
  )
}

export default JoinList
