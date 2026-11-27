import { Button, Popconfirm } from 'antd'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import RegApplyApi from '@/api/regApply'
import useModal from '@/hooks/useModal'
import { processPublicRegistData } from '@/api/common'
interface ActionProps {
  row: any
  btn: string[]
  onReloadList: () => void
}
const Action = ({ row, btn, onReloadList }: ActionProps) => {
  const { env } = useModal('global')
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
  // 撤销登记申请
  const cancelRegApply = async () => {
    const { code, data } = await RegApplyApi.cancelRegApply({
      dataRegistId: row?.dataRegistId || null
    })
    if (code === 20000 && data) {
      window.$message.success('撤销登记成功')
      onReloadList()
    }
  }
  // 撤销变更提交登记申请
  const cancelChangeRegApply = async () => {
    const { code, data } = await RegApplyApi.cancelChangeRegApply({
      dataRegistId: row?.dataRegistId || null
    })
    if (code === 20000 && data) {
      window.$message.success('撤销变更提交成功')
      onReloadList()
    }
  }
  // 撤销更正登记申请
  const cancelRegCorrect = async () => {
    const { code, data } = await RegApplyApi.cancelRegApplyCorrect({
      dataRegistId: row?.dataRegistId || null
    })
    if (code === 20000 && data) {
      window.$message.success('撤销更正成功')
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
        key: 'viewConfirm',
        label: '查看确认单',
        danger: false,
        onClick: () => {},
        visible: () => btn.includes('viewConfirm')
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
      },
      {
        key: 'cancelChangeReg',
        label: '撤销变更',
        danger: true,
        popconfirm: {
          title: '温馨提示',
          description: '撤销变更提交后将无法恢复，是否继续？',
          onConfirm: cancelChangeRegApply,
          onCancel: () => {},
          okText: '确认',
          cancelText: '取消'
        },
        visible: () => btn.includes('cancelChangeReg')
      },
      {
        key: 'cancelRegCorrect',
        label: '撤销更正',
        danger: true,
        popconfirm: {
          title: '温馨提示',
          description: '撤销更正后将无法恢复，是否继续？',
          onConfirm: cancelRegCorrect,
          onCancel: () => {},
          okText: '确认',
          cancelText: '取消'
        },
        visible: () => btn.includes('cancelRegCorrect')
      },
      {
        key: 'processPublicRegistData',
        label: '处理公示',
        danger: true,
        onClick: async () => {
          processPublicRegistData(row?.dataRegistId || null)
        },
        visible: () => env === 'dev' && row?.status === '公示中'
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
