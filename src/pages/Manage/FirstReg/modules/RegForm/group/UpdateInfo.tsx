import { Descriptions } from 'antd'
import styles from '../index.module.scss'
import { getEnumLabel } from '@/pages/Manage/Enum'

const UpdateInfo = ({ detail }: { detail: any }) => {
  return (
    <Descriptions
      className={styles.descriptions}
      bordered
      column={2}
      size='small'
    >
      <Descriptions.Item label='登记编码'>
        {detail?.dataRegistCode}
      </Descriptions.Item>
      <Descriptions.Item label='登记数据名称'>
        {detail?.dataRegistName}
      </Descriptions.Item>
      <Descriptions.Item label='登记数据类型'>
        {getEnumLabel('dataRegistTypeEnum', detail?.dataRegistType)}
      </Descriptions.Item>
      <Descriptions.Item label='登记主体名称'>
        {detail?.institutionName}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default UpdateInfo
