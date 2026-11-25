import { ProColumns, ProTable } from '@ant-design/pro-components'
import { ApprovaListItem } from '@/api/types/approvalManage'
import EllipsisText from '@/components/EllipsisText'
import { dataRegistTypeEnum, getEnumLabel } from '../../Enum'
import ApprovalManageApi from '@/api/approvalManage'
import useTableScroll from '@/hooks/useTableScroll'
import useModal from '@/hooks/useModal'
const ApprovaList = ({ type }: { type: 'todo' | 'complete' }) => {
  const { userInfo } = useModal('user')
  const { scroll, updateScrollY } = useTableScroll()
  const columns: ProColumns<ApprovaListItem>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 80,
      search: false
    },
    {
      title: '申请流水号',
      dataIndex: 'applyNo',
      width: 160,
      search: false
    },
    {
      title: '登记数据名称',
      dataIndex: 'dataRegistName',
      width: 380,
      fieldProps: { placeholder: '请输入' },
      render: (_, row) => (
        <div style={{ width: '100%' }}>
          <EllipsisText text={row.dataRegistName} />
        </div>
      )
    },
    {
      title: '数据登记类型',
      dataIndex: 'dataRegistType',
      width: 200,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '全部',
            value: '-1'
          },
          ...dataRegistTypeEnum
        ]
      },
      render: (_, row) => getEnumLabel('dataRegistTypeEnum', row.dataRegistType)
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      width: 100,
      search: false,
      render: (_, row) => row.status
    },
    {
      title: '申请人/主体',
      dataIndex: 'applicantName',
      width: 160,
      search: false
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
  const fetchList = async (params: any) => {
    const ApiFun =
      type === 'todo'
        ? ApprovalManageApi.getExamineList
        : ApprovalManageApi.getCompletedList
    const {
      current = 1,
      pageSize = 10,
      dataRegistName,
      dataRegistType,
      applyTime = 'descend'
    } = params
    const { code, data } = await ApiFun({
      pageNum: current,
      pageSize,
      sortField: 'updatedTime',
      sortDirection: applyTime === 'descend' ? 'DESC' : 'ASC',
      ...(dataRegistName ? { dataRegistName } : {}),
      ...(dataRegistType && dataRegistType !== '-1'
        ? { dataRegistType: Number(dataRegistType) }
        : {}),
      ...(type === 'complete' ? { personage: userInfo?.personage } : {}),
      ...(type === 'todo' ? { status: ['主体审核'] } : {})
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
    <ProTable<ApprovaListItem>
      name='approvalList'
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

export default ApprovaList
