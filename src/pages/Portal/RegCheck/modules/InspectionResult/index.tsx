import { Descriptions, Modal } from 'antd'
import dayjs from 'dayjs'
import type { DataInspectionResult } from '@/api/portal/regCheck'
import styles from './index.module.scss'

interface Props {
  open: boolean
  result: DataInspectionResult | null
  onClose: () => void
}

const formatTime = (value?: string) =>
  value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'

/** 登记结果查验弹窗 */
const InspectionResult = ({ open, result, onClose }: Props) => {
  const success = result?.result === 'true'

  return (
    <Modal
      open={open}
      width={800}
      footer={null}
      onCancel={onClose}
      classNames={{
        container: styles.container,
        header: styles.header,
        title: styles.title,
        close: styles.close
      }}
      title={
        <div>
          查验结果：{success ? '查询成功' : '未查到登记确认单'}
          <span className={styles.subTitle}>
            查验时间：{formatTime(result?.inspectionTime)}
          </span>
        </div>
      }
    >
      {success && (
        <Descriptions
          bordered
          column={1}
          items={[
            {
              key: 'regNumber',
              label: '登记确认单编号',
              children: result?.regNumber || '-'
            },
            {
              key: 'dataRegistName',
              label: '登记名称',
              children: result?.dataRegistName || '-'
            },
            {
              key: 'institutionName',
              label: '登记主体名称',
              children: result?.institutionName || '-'
            }
          ]}
        />
      )}
      <div className={styles.tip}>
        <b>特别提示</b>
        <div>
          &gt;&gt;
          登记确认单不存在时，不得使用不存在的登记确认单办理合法业务和签署合同，任何单位或个人有权拒绝并向对应数据管理部门或登记机构举报
        </div>
      </div>
    </Modal>
  )
}

export default InspectionResult
