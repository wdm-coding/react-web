import { Descriptions } from 'antd'
import styles from '../index.module.scss'

const UpdateInfo = () => {
  return (
    <Descriptions
      className={styles.descriptions}
      bordered
      column={2}
      size='small'
    >
      <Descriptions.Item label='登记编码'>{'登记编码'}</Descriptions.Item>
      <Descriptions.Item label='登记数据名称'>
        {'登记数据名称'}
      </Descriptions.Item>
      <Descriptions.Item label='登记数据类型'>
        {'登记数据类型'}
      </Descriptions.Item>
      <Descriptions.Item label='登记主体名称'>
        {'登记主体名称'}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default UpdateInfo
