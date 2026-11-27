import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Button } from 'antd'
import {
  ActionType,
  ProTable,
  type ProColumns
} from '@ant-design/pro-components'
import { certificateStatusEnum, getEnumLabel } from '@/pages/Manage/Enum/index'
import CertManageApi from '@/api/certManage'
import { ProofItem } from '@/api/types/certManage'
import Icon from '@/components/Icon'
import { useRef } from 'react'
import icon1 from '@/assets/images/manage/icon1.png'
import icon2 from '@/assets/images/manage/icon2.png'
import EllipsisText from '@/components/EllipsisText'
import useTableScroll from '@/hooks/useTableScroll'
import dayjs from 'dayjs'
import StatusView from '@/components/StatusView'
import { useNavigate } from 'react-router-dom'

const CertManage = () => {
  const navigate = useNavigate()
  const actionRef = useRef<ActionType>(null)
  const { scroll, updateScrollY } = useTableScroll(1400)
  // 查询确认单列表
  const fetchProofList = async (params: any) => {
    const {
      current = 1,
      pageSize = 10,
      certificateCode,
      dataRegistName,
      certificateStatus
    } = params
    const { code, data } = await CertManageApi.getProofList({
      pageNum: current,
      pageSize,
      sortField: 'updatedTime',
      sortDirection: 'DESC',
      ...(certificateCode ? { certificateCode } : {}),
      ...(dataRegistName ? { dataRegistName } : {}),
      ...(certificateStatus ? { certificateStatus } : {})
    })
    const list = data?.content || []
    updateScrollY(list.length)
    return {
      success: code === 20000,
      data: list,
      total: Number(data?.totalElements) || 0
    }
  }
  const proofColumns: ProColumns<ProofItem>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 80,
      search: false
    },
    {
      title: '确认单编号',
      dataIndex: 'certificateCode',
      width: 260,
      fieldProps: { placeholder: '确认单编号' }
    },
    {
      title: '登记数据名称',
      dataIndex: 'dataRegistName',
      width: 380,
      fieldProps: { placeholder: '登记数据名称' },
      render: (_, row) => (
        <div style={{ width: '100%' }}>
          <EllipsisText text={row.dataRegistName} />
        </div>
      )
    },
    {
      title: '登记数据类型',
      dataIndex: 'dataRegistType',
      width: 180,
      search: false,
      render: (_, row) => (
        <span className={styles.typeCell}>
          <Icon
            name={row.dataRegistType === '1' ? icon1 : icon2}
            size={16}
            color='#1471ff'
          />
          {getEnumLabel('dataRegistTypeEnum', row.dataRegistType)}
        </span>
      )
    },
    {
      title: '确认单状态',
      dataIndex: 'certificateStatus',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: certificateStatusEnum
      },
      render: (_, row) => (
        <StatusView
          statusName={getEnumLabel(
            'certificateStatusEnum',
            row.certificateStatus
          )}
          color={
            certificateStatusEnum.find(
              (item) => item.value === row.certificateStatus
            )?.color || '#000'
          }
        />
      )
    },
    {
      title: '有效期起',
      dataIndex: 'validityPeriodStartTime',
      width: 140,
      search: false,
      render: (_, row) =>
        dayjs(row?.validityPeriodStartTime).format('YYYY-MM-DD') || '-'
    },
    {
      title: '有效期止',
      dataIndex: 'cvalidityDeadline',
      width: 140,
      search: false,
      render: (_, row) =>
        dayjs(row?.cvalidityDeadline).format('YYYY-MM-DD') || '-'
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, row: ProofItem) => (
        <Button
          type='link'
          size='small'
          onClick={() => {
            navigate(`/manage/regApply/regApplyDetail`, {
              state: {
                dataRegistId: row?.dataRegistId || null,
                certificateId: row?.certificateId || null
              }
            })
          }}
        >
          查看
        </Button>
      )
    }
  ]
  return (
    <PageContainer title='确认单查询'>
      <div className={styles.certManageWrapper}>
        <div className={styles.content}>
          <ProTable<ProofItem>
            actionRef={actionRef}
            name='certManage'
            rowKey='certificateCode'
            columns={proofColumns}
            request={(params, filters) =>
              fetchProofList({ ...params, ...filters })
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
      </div>
    </PageContainer>
  )
}
export default CertManage
