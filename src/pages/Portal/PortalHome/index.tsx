import styles from './index.module.scss'
import Icon from '@/components/Icon'
import logo from '@/assets/images/common/logo.jpeg'
const PortalHome = () => {
  return (
    <div className={styles.portalHomeWrapper}>
      <Icon
        name={
          new URL('@/assets/images/common/logo.jpeg', import.meta.url).href
        }
        label='门户首页1'
        labelColor='#000'
        labelSize={16}
        size={34}
        color='#ff0000'
        labelPos='left'
        gap={20}
      />
      <Icon
        name='StepBackwardOutlined'
        label='门户首页'
        size={34}
        color='#ff0000'
        labelColor='#000'
        labelSize={16}
        gap={10}
      />
      <Icon
        name={logo}
        label='门户首页1'
        labelColor='#000'
        labelSize={16}
        size={34}
        color='#ff0000'
        labelPos='bottom'
        gap={20}
      />
      <Icon
        name='svg-react'
        label='门户首页'
        labelColor='#000'
        labelSize={16}
        size={34}
        color='#ff0000'
        labelPos='top'
        gap={20}
      />
    </div>
  )
}

export default PortalHome
