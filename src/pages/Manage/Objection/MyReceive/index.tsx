import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Button } from 'antd'
import {
  ActionType,
  ProTable,
  type ProColumns
} from '@ant-design/pro-components'
import { examineStatusEnum, getEnumLabel } from '@/pages/Manage/Enum/index'
import ObjectionApi from '@/api/objection'
import { ObjectionItem } from '@/api/types/objection'
import { useRef } from 'react'
import EllipsisText from '@/components/EllipsisText'
import useTableScroll from '@/hooks/useTableScroll'

const MyReceive = () => {
  const actionRef = useRef<ActionType>(null)
  const { scroll, updateScrollY } = useTableScroll(1300)
  // TODO: 待详情功能就绪后接入
  const handleDetail = () => {}
  // 查询我接收的异议申诉列表
  const fetchObjectionList = async (params: any) => {
    const {
      current = 1,
      pageSize = 10,
      objectionNo,
      dataRegistName,
      institutionName,
      examineStatus,
      submitTime
    } = params
    const { code, data } = await ObjectionApi.getObjectionList({
      pageNum: current,
      pageSize,
      sortField: 'updatedTime',
      sortDirection: submitTime === 'ascend' ? 'ASC' : 'DESC',
      queryType: '2',
      ...(objectionNo ? { serialNumber: objectionNo } : {}),
      ...(dataRegistName ? { dataRegistName } : {}),
      ...(institutionName ? { institutionName } : {}),
      ...(examineStatus ? { examineStatus: [Number(examineStatus)] } : {})
    })
    const list = data?.content || []
    updateScrollY(list.length)
    return {
      success: code === 20000,
      data: list,
      total: Number(data?.totalElements) || 0
    }
  }
  const objectionColumns: ProColumns<ObjectionItem>[] = [
    {
      title: '申诉流水号',
      dataIndex: 'objectionNo',
      width: 200,
      fieldProps: { placeholder: '请输入' },
      render: (_, row) => row.objectionNo || '-'
    },
    {
      title: '登记数据名称',
      dataIndex: 'dataRegistName',
      width: 340,
      fieldProps: { placeholder: '请输入' },
      render: (_, row) => (
        <div style={{ width: '100%' }}>
          <EllipsisText text={row.dataRegistName} />
        </div>
      )
    },
    {
      title: '登记数据主体',
      dataIndex: 'institutionName',
      width: 240,
      fieldProps: { placeholder: '请输入' },
      render: (_, row) => (
        <div style={{ width: '100%' }}>
          <EllipsisText text={row.institutionName} />
        </div>
      )
    },
    {
      title: '异议状态',
      dataIndex: 'examineStatus',
      width: 160,
      valueType: 'select',
      fieldProps: {
        options: examineStatusEnum,
        placeholder: '请选择'
      },
      render: (_, row) => getEnumLabel('examineStatusEnum', row.examineStatus)
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      width: 180,
      search: false,
      sorter: true,
      render: (_, row) => row.submitTime || '-'
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: () => (
        <Button type='link' size='small' onClick={handleDetail}>
          详情
        </Button>
      )
    }
  ]
  return (
    <PageContainer title='我收到的'>
      <div className={styles.myReceiveWrapper}>
        <div className={styles.content}>
          <ProTable<ObjectionItem>
            actionRef={actionRef}
            name='objectionMyReceive'
            rowKey='objectionNo'
            columns={objectionColumns}
            request={(params, sort) =>
              fetchObjectionList({ ...params, ...sort })
            }
            scroll={scroll}
            size='small'
            bordered
            options={false}
            search={{
              labelWidth: 'auto',
              span: 6
            }}
            pagination={{
              defaultPageSize: 10,
              totalBoundaryShowSizeChanger: 10
            }}
            toolBarRender={false}
          />
        </div>
      </div>
    </PageContainer>
  )
}
export default MyReceive
