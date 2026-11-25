import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Button, Tabs } from 'antd'
import {
  ActionType,
  ProTable,
  type ProColumns
} from '@ant-design/pro-components'
import {
  regApproTypeEnum,
  dataRegistTypeEnum,
  getEnumLabel,
  regApplyTypeEnum
} from '@/pages/Manage/Enum/index'
import RegApplyApi from '@/api/regApply'
import { RegApplyItem } from '@/api/types/regApply'
import Icon from '@/components/Icon'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icon1 from '@/assets/images/manage/icon1.png'
import icon2 from '@/assets/images/manage/icon2.png'
import EllipsisText from '@/components/EllipsisText'
import useTableScroll from '@/hooks/useTableScroll'
import Action from './Action'

const RegApplyList = () => {
  const actionRef = useRef<ActionType>(null)
  const { scroll, updateScrollY } = useTableScroll()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('0')
  const onChangeTab = (key: string) => {
    setActiveKey(key)
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
  // 审核状态
  const CheckStatus = ({ statusName }: { statusName: string }) => {
    const color =
      regApplyTypeEnum?.find((item) => item.label === statusName)?.color ||
      '#000'
    return (
      <span className={styles.statusCell} style={{ color }}>
        <i className={styles.dot} />
        {statusName || '-'}
      </span>
    )
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
      title: '操作类型',
      dataIndex: 'regApproType',
      width: 100,
      search: false,
      render: (_, row) => getEnumLabel('regApproTypeEnum', row.regApproType)
    },
    {
      title: '登记数据类型',
      dataIndex: 'dataRegistType',
      width: 180,
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
      render: (_, row) => <CheckStatus statusName={row.status}></CheckStatus>
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
      width: 150,
      fixed: 'right',
      render: (_, row) => {
        const btn =
          regApplyTypeEnum?.find((item) => item.label === row.status)?.btn || []
        return (
          <Action
            row={row}
            btn={btn}
            onReloadList={() => actionRef.current?.reload()}
          />
        )
      }
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
            actionRef={actionRef}
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
            toolBarRender={() =>
              activeKey !== '0'
                ? [
                    <Button
                      key='create'
                      type='primary'
                      onClick={() =>
                        navigate('/manage/firstReg/add', {
                          state: { regApproType: activeKey }
                        })
                      }
                    >
                      申请{getEnumLabel('regApproTypeEnum', activeKey)}
                    </Button>,
                    ...(activeKey === '1'
                      ? [
                          <Button key='import' onClick={handleImport}>
                            导入
                          </Button>,
                          <Button key='export' onClick={handleExport}>
                            导出
                          </Button>
                        ]
                      : [])
                  ]
                : []
            }
          />
        </div>
      </div>
    </PageContainer>
  )
}
export default RegApplyList
