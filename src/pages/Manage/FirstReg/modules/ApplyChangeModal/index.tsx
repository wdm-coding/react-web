import styles from './index.module.scss'
import { Alert, Button, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import regApplyApi from '@/api/regApply'
import { getEnumLabel } from '@/pages/Manage/Enum'
import Icon from '@/components/Icon'
import icon1 from '@/assets/images/manage/icon1.png'
import icon2 from '@/assets/images/manage/icon2.png'
import useModal from '@/hooks/useModal'
import EllipsisText from '@/components/EllipsisText'
const ApplyChangeModal = ({
  open,
  onCancel,
  onConfirm,
  loading,
  regApproType
}: {
  open: boolean
  onCancel: () => void
  onConfirm: (selectedRow?: any) => void
  loading: boolean
  regApproType: string
}) => {
  const { userInfo } = useModal('user')
  const [dataSource, setDataSource] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  // 获取可操作数据
  const getScreeningData = async (page: number, size: number) => {
    setTableLoading(true)
    const { code, data } = await regApplyApi.getScreeningData({
      pageNum: page,
      pageSize: size,
      personage: userInfo?.personage,
      regApproType
    })
    if (code === 20000) {
      setDataSource(data?.content || [])
      setTotal(Number(data?.totalElements) || 0)
    }
    setTableLoading(false)
  }
  // 弹窗打开时重新获取数据
  useEffect(() => {
    if (open) {
      setPageNum(1)
      setSelectedRow(null)
      getScreeningData(1, pageSize)
    }
  }, [open])
  // 变更登记确认
  const handleConfirm = () => {
    if (!selectedRow) {
      window.$message.warning('请选择一条需要进行登记变更的登记记录')
      return
    }
    onConfirm({
      dataRegistId: selectedRow?.dataRegistId || null,
      orgDataRegistId: selectedRow?.orgDataRegistId || null
    })
  }
  const columns = [
    {
      title: '流水号',
      dataIndex: 'serialNumber',
      width: 150
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
      width: 180,
      render: (_: any, row: any) => (
        <span className={styles.typeCell}>
          <Icon
            name={row?.dataRegistType === '1' ? icon1 : icon2}
            size={16}
            color='#1471ff'
          />
          {getEnumLabel('dataRegistTypeEnum', row?.dataRegistType)}
        </span>
      )
    },
    {
      title: '申请时间',
      dataIndex: 'applyForTime',
      width: 150
    }
  ]
  return (
    <Modal
      title='选择变更数据资源'
      open={open}
      width={900}
      onCancel={onCancel}
      mask={{ closable: false }}
      footer={
        <div className={styles.confirmFooter}>
          <Button onClick={onCancel}>取消</Button>
          <Button type='primary' onClick={handleConfirm} loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <div className={styles.applyChangeModal}>
        <Alert
          className={styles.changeAlert}
          type='warning'
          showIcon
          description='仅当前账号主体下申请通过状态的登记记录可发起登记变更，请选择一条需要进行登记变更的登记记录。'
        />
        <Table
          rowKey='dataRegistId'
          size='small'
          loading={tableLoading}
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: 'radio',
            columnWidth: 50,
            selectedRowKeys: selectedRow ? [selectedRow?.dataRegistId] : [],
            onChange: (_, rows) => setSelectedRow(rows?.[0] || null)
          }}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            onChange: (page, size) => {
              setPageNum(page)
              setPageSize(size)
              getScreeningData(page, size)
            }
          }}
        />
      </div>
    </Modal>
  )
}

export default ApplyChangeModal
