import React, { useMemo } from 'react'
import { Button, Descriptions, Modal } from 'antd'
import styles from './index.module.scss'
import useModal from '@/hooks/useModal'
import { getEnumLabel } from '@/pages/Manage/Enum'
interface Props {
  open: boolean
  values: Record<string, any> | null
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}
const ConfirmInfo: React.FC<Props> = ({
  open,
  values,
  onClose,
  onConfirm,
  loading
}) => {
  const { userInfo } = useModal('user')
  const onCancel = () => {
    onClose()
  }
  // 空值展示--
  const show = (value?: string) => value || '--'
  const items = useMemo(
    () => [
      {
        key: 'dataRegistName',
        label: '登记数据名称',
        children: show(
          [
            values?.coverageAreaName,
            values?.industryName,
            values?.dataRegistName
          ]
            .filter(Boolean)
            .join('-')
        )
      },
      {
        key: 'subjectName',
        label: '登记主体名称',
        children: show(userInfo?.currentIns?.institutionName)
      },
      {
        key: 'industryName',
        label: '行业分类',
        children: show(values?.industryName)
      },
      {
        key: 'dataRegistType',
        label: '登记数据类型',
        children: show(
          getEnumLabel('dataRegistTypeEnum', values?.dataRegistType)
        )
      },
      {
        key: 'publicityPeriod',
        label: '公示周期',
        children: '自审核通过起10个工作日'
      },
      {
        key: 'publicityStatus',
        label: '公示状态',
        children: '待公示'
      },
      {
        key: 'orgArea',
        label: '登记机构',
        children: show(values?.orgArea)
      },
      {
        key: 'registSource',
        label: '登记来源',
        children: '甘肃省公共数据资源登记平台'
      },
      {
        key: 'sharedInstitutionName',
        label: '共有主体名称',
        children: show(
          values?.sharedDataList
            ?.map((item: any) => item?.sharedInstitutionName)
            .filter(Boolean)
            .join('、')
        )
      },
      {
        key: 'dataContentIntroduction',
        label: '数据内容简介',
        children: show(values?.dataContentIntroduction)
      }
    ],
    [values, userInfo]
  )
  return (
    <Modal
      title='注册信息确认'
      open={open}
      width={760}
      onCancel={onCancel}
      mask={{ closable: false }}
      footer={
        <div className={styles.confirmFooter}>
          <Button onClick={onCancel}>取消</Button>
          <Button type='primary' onClick={onConfirm} loading={loading}>
            我已知晓
          </Button>
        </div>
      }
    >
      <div className={styles.confirmInfoWrapper}>
        <div className={styles.confirmTip}>
          登记数据提交成功且审批通过后将进入公示阶段，公示数据如下:
        </div>
        <Descriptions bordered column={1} items={items} size='small' />
      </div>
    </Modal>
  )
}

export default ConfirmInfo
