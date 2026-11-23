import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Button, Tabs } from 'antd'
import { ProTable, type ProColumns } from '@ant-design/pro-components'
import {
  regApproTypeEnum,
  dataRegistTypeEnum,
  getEnumLabel
} from '@/pages/Manage/Enum/index'
import RegApplyApi, { type RegApplyItem } from '@/api/regApply'
import Icon from '@/components/Icon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icon1 from '@/assets/images/manage/icon1.png'
import icon2 from '@/assets/images/manage/icon2.png'
import EllipsisText from '@/components/EllipsisText'
import useTableScroll from '@/hooks/useTableScroll'

const RegApplyList = () => {
  const { scroll, updateScrollY } = useTableScroll()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('0')
  const onChangeTab = (key: string) => {
    setActiveKey(key)
  }
  // TODO: 待编辑接口/页面就绪后接入
  const handleEdit = (row: RegApplyItem) => {
    navigate(`/manage/firstReg`, {
      state: {
        dataRegistId: row.dataRegistId,
        regApproType: row.regApproType
      }
    })
  }
  // TODO: 待删除接口就绪后接入
  const handleDelete = (row: RegApplyItem) => {
    void row
  }
  // TODO: 待导入接口就绪后接入
  const handleImport = () => {}
  // TODO: 待导出接口就绪后接入
  const handleExport = () => {}
  // 查询登记申请列表
  const fetchRegApplyList = async (params: any) => {
    const {
      current = 1,
      pageSize = 10,
      regApproType,
      serialNumber,
      dataRegistName,
      dataRegistType,
      updatedTime = 'descend'
    } = params
    const { code, data } = await RegApplyApi.getRegApplyList({
      pageNum: current,
      pageSize,
      sortField: 'updatedTime',
      sortDirection: updatedTime === 'descend' ? 'DESC' : 'ASC',
      ...(regApproType !== '0' ? { regApproType } : {}),
      ...(serialNumber ? { serialNumber } : {}),
      ...(dataRegistName ? { dataRegistName } : {}),
      ...(dataRegistType ? { dataRegistType } : {})
    })
    const list = data?.content || []
    updateScrollY(list.length)
    return {
      success: code === 20000,
      data: list,
      total: Number(data?.totalElements) || 0
    }
  }
  const regApplyColumns: ProColumns<RegApplyItem>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 80,
      search: false
    },
    {
      title: '申请流水号',
      dataIndex: 'serialNumber',
      width: 150,
      fieldProps: { placeholder: '请输入' }
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
      width: 160,
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
      title: '审核状态',
      dataIndex: 'status',
      width: 80,
      search: false,
      render: (_, row) => (
        <span className={styles.statusCell}>
          <i className={styles.dot} />
          {row.status || '-'}
        </span>
      )
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      width: 100,
      search: false,
      sorter: true
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, row) => [
        <Button
          key='edit'
          type='link'
          size='small'
          onClick={() => handleEdit(row)}
        >
          编辑
        </Button>,
        <Button
          key='delete'
          type='link'
          size='small'
          danger
          onClick={() => handleDelete(row)}
        >
          删除
        </Button>
      ]
    }
  ]
  const tabItems = regApproTypeEnum.map((item) => ({
    label: <span style={{ padding: '0 10px' }}>{item.label}</span>,
    key: item.value
  }))
  return (
    <PageContainer title='登记申请'>
      <div className={styles.regApplyListWrapper}>
        <Tabs activeKey={activeKey} items={tabItems} onChange={onChangeTab} />
        <div className={styles.content}>
          <ProTable<RegApplyItem>
            name='regApplyList'
            rowKey='dataRegistId'
            columns={regApplyColumns}
            request={(params, filters) =>
              fetchRegApplyList({ ...params, ...filters })
            }
            params={{ regApproType: activeKey }}
            rowSelection={activeKey === '1' ? { columnWidth: 50 } : false}
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
            toolBarRender={() => [
              <Button
                key='create'
                type='primary'
                onClick={() => navigate('/manage/firstReg')}
              >
                申请首次登记
              </Button>,
              <Button key='import' onClick={handleImport}>
                导入
              </Button>,
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
export default RegApplyList
