import { Button, Popconfirm } from 'antd'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import RegApplyApi from '@/api/regApply'
interface ActionProps {
  row: any
  btn: string[]
  onReloadList: () => void
}
const Action = ({ row, btn, onReloadList }: ActionProps) => {
  const navigate = useNavigate()
  const deleteRegApplyDraft = async () => {
    const { code, data } = await RegApplyApi.deleteRegApplyDraft({
      dataRegistId: row?.dataRegistId || null
    })
    if (code === 20000 && data) {
      window.$message.success('删除成功')
      onReloadList()
    }
  }
  const cancelRegApply = async () => {
    const { code, data } = await RegApplyApi.cancelRegApply({
      dataRegistId: row?.dataRegistId || null
    })
    if (code === 20000 && data) {
      window.$message.success('撤销登记成功')
      onReloadList()
    }
  }
  const list = useMemo(
    () => [
      {
        key: 'edit',
        label: '编辑',
        danger: false,
        onClick: () => {
          navigate(`/manage/firstReg/edit`, {
            state: {
              dataRegistId: row?.dataRegistId || null,
              regApproType: row?.regApproType || null
            }
          })
        },
        visible: () => btn.includes('edit')
      },
      {
        key: 'detail',
        label: '详情',
        danger: false,
        onClick: () => {
          navigate(`/manage/regApply/regApplyDetail`, {
            state: {
              dataRegistId: row?.dataRegistId || null,
              regApproType: row?.regApproType || null
            }
          })
        },
        visible: () => btn.includes('detail')
      },
      {
        key: 'delete',
        label: '删除',
        popconfirm: {
          title: '温馨提示',
          description: '删除后将无法恢复，是否继续？',
          onConfirm: deleteRegApplyDraft,
          onCancel: () => {},
          okText: '确认',
          cancelText: '取消'
        },
        danger: true,
        visible: () => btn.includes('delete')
      },
      {
        key: 'cancelReg',
        label: '撤销登记',
        danger: true,
        popconfirm: {
          title: '温馨提示',
          description: '撤销登记后将无法恢复，是否继续？',
          onConfirm: cancelRegApply,
          onCancel: () => {},
          okText: '确认',
          cancelText: '取消'
        },
        visible: () => btn.includes('cancelReg')
      }
    ],
    [btn]
  )
  return list
    ?.filter((item) => item.visible())
    .map((item) =>
      item.popconfirm ? (
        <Popconfirm key={item.key} {...item.popconfirm}>
          <Button type='link' size='small' danger={item.danger}>
            {item.label}
          </Button>
        </Popconfirm>
      ) : (
        <Button
          key={item.key}
          type='link'
          size='small'
          danger={item.danger}
          onClick={item.onClick}
        >
          {item.label}
        </Button>
      )
    )
}

export default Action
