import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Button } from 'antd'
import {
  ActionType,
  ProTable,
  type ProColumns
} from '@ant-design/pro-components'
import {
  dataRegistTypeEnum,
  getEnumLabel,
  regApproTypeEnum,
  changeStatusEnum
} from '@/pages/Manage/Enum/index'
import RegApplyApi from '@/api/regApply'
import { RegDataItem } from '@/api/types/regApply'
import Icon from '@/components/Icon'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import icon1 from '@/assets/images/manage/icon1.png'
import icon2 from '@/assets/images/manage/icon2.png'
import EllipsisText from '@/components/EllipsisText'
import useTableScroll from '@/hooks/useTableScroll'

const RegApplyData = () => {
  const actionRef = useRef<ActionType>(null)
  const { scroll, updateScrollY } = useTableScroll(1500)
  const navigate = useNavigate()
  // TODO: 待导出接口就绪后接入
  const handleExport = () => {}
  // 查询登记数据列表
  const fetchRegQueryData = async (params: any) => {
    const {
      pageNum = 1,
      pageSize = 10,
      dataRegistName,
      dataRegistType,
      changeStatus,
      institutionName,
      regApproType,
      applyForTime,
      updatedTime = 'descend'
    } = params

    const { code, data } = await RegApplyApi.getRegQueryData({
      pageNum,
      pageSize,
      sortField: 'updatedTime',
      sortDirection: updatedTime === 'descend' ? 'DESC' : 'ASC',
      ...(dataRegistName ? { dataRegistName } : {}),
      ...(dataRegistType ? { dataRegistType } : {}),
      ...(changeStatus ? { changeStatus } : {}),
      ...(institutionName ? { institutionName } : {}),
      ...(regApproType ? { regApproType } : {}),
      ...(applyForTime?.length === 2
        ? {
            regApproStartTime: applyForTime[0],
            regApproEndTime: applyForTime[1]
          }
        : {})
    })
    const list = data?.content || []
    updateScrollY(list.length)
    return {
      success: code === 20000,
      data: list,
      total: Number(data?.totalElements) || 0
    }
  }
  // 登记状态
  const ChangeStatus = ({ changeStatus }: { changeStatus: string }) => {
    return (
      <span className={styles.statusCell}>
        <i className={styles.dot} style={{ backgroundColor: '#1577ff' }} />
        {getEnumLabel('changeStatusEnum', changeStatus)}
      </span>
    )
  }
  const regDataColumns: ProColumns<RegDataItem>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 80,
      search: false
    },
    {
      title: '登记数据名称',
      dataIndex: 'dataRegistName',
      width: 380,
      render: (_, row) => (
        <div style={{ width: '100%' }}>
          <EllipsisText text={row.dataRegistName} />
        </div>
      )
    },
    {
      title: '登记数据类型',
      dataIndex: 'dataRegistType',
      width: 140,
      valueType: 'select',
      fieldProps: {
        options: dataRegistTypeEnum
      },
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
      title: '登记状态',
      dataIndex: 'changeStatus',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: changeStatusEnum
      },
      render: (_, row) => (
        <ChangeStatus changeStatus={row?.changeStatus || ''} />
      )
    },
    {
      title: '登记主体',
      dataIndex: 'institutionName',
      width: 200,
      fieldProps: { placeholder: '请输入' },
      render: (_, row) => (
        <div style={{ width: '100%' }}>
          <EllipsisText text={row.institutionName} />
        </div>
      )
    },
    {
      title: '登记申请类型',
      dataIndex: 'regApproType',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: regApproTypeEnum.filter((item) => item.value !== '0')
      },
      render: (_, row) => getEnumLabel('regApproTypeEnum', row.regApproType)
    },
    {
      title: '申请时间',
      dataIndex: 'applyForTime',
      width: 160,
      valueType: 'dateRange',
      sorter: true,
      render: (_, row) => row.applyForTime || '-'
    },
    {
      title: '确认单编号',
      dataIndex: 'confirmNumber',
      width: 160,
      search: false
    },
    {
      title: '登记机构',
      dataIndex: 'organizationName',
      width: 160,
      search: false
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, row) => (
        <Button
          type='link'
          size='small'
          onClick={() =>
            navigate('/manage/regApply/regApplyDetail', {
              state: {
                dataRegistId: row?.dataRegistId || null,
                regApproType: row?.regApproType || null
              }
            })
          }
        >
          详情
        </Button>
      )
    }
  ]
  return (
    <PageContainer title='登记数据查询'>
      <div className={styles.regApplyDataWrapper}>
        <div className={styles.content}>
          <ProTable<RegDataItem>
            actionRef={actionRef}
            name='regApplyData'
            rowKey='dataRegistId'
            columns={regDataColumns}
            request={(params, filters) =>
              fetchRegQueryData({
                ...params,
                updatedTime: filters?.applyForTime
              })
            }
            rowSelection={{ columnWidth: 50 }}
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
            toolBarRender={() => [
              <Button key='export' onClick={handleExport}>
                导出
              </Button>
            ]}
          />
        </div>
      </div>
    </PageContainer>
  )
}
export default RegApplyData
