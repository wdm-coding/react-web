import { Input } from 'antd'
import type { InputProps } from 'antd'
import styles from './index.module.scss'

interface Props {
  /** 验证码图片 base64 */
  captcha: string
  onRefresh: () => void
  /** 以下由 Form.Item 注入 */
  value?: string
  onChange?: InputProps['onChange']
}

/** 图形验证码输入框 + 图片，点击图片刷新 */
const CaptchaField = ({ captcha, onRefresh, value, onChange }: Props) => (
  <div className={styles.captcha}>
    <Input placeholder='验证码' value={value} onChange={onChange} />
    {captcha && (
      <img
        src={`data:image/jpeg;base64,${captcha}`}
        alt='验证码'
        onClick={onRefresh}
      />
    )}
  </div>
)

export default CaptchaField
