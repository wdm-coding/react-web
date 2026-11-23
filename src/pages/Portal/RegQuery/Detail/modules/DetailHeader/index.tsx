import { Tag } from 'antd'
import { DATA_REGIST_TYPE_MAP } from '@/dict'
import resourceIcon from '@/assets/images/portal/resource-title-icon.png'
import styles from './index.module.scss'

interface Props {
  name?: string
  /** 登记数据类型：1 公共数据资源，2 公共数据产品和服务 */
  dataRegistType?: string
}

/** 资源详情标题：图标 + 名称 + 数据类型标签 */
const DetailHeader = ({ name, dataRegistType }: Props) => (
  <div className={styles.title}>
    <img className={styles.icon} src={resourceIcon} alt='' />
    <span>{name || '-'}</span>
    {dataRegistType && (
      <Tag
        variant='filled'
        color={dataRegistType === '1' ? 'purple' : 'blue'}
        className={styles.tag}
      >
        {DATA_REGIST_TYPE_MAP[dataRegistType] ?? dataRegistType}
      </Tag>
    )}
  </div>
)

export default DetailHeader
