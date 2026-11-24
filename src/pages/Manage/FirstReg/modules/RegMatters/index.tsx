import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const COUNTDOWN_SECONDS = 5

interface RegMattersProps {
  open: boolean
  onClose: () => void
}
const RegMatters: React.FC<RegMattersProps> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [count, setCount] = useState(COUNTDOWN_SECONDS)
  // 弹窗打开后开始 5 秒倒计时，倒计时结束按钮才可点击
  useEffect(() => {
    if (!open) return
    setCount(COUNTDOWN_SECONDS)
    const timer = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1
        clearInterval(timer)
        return 0
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [open])
  const onCancel = () => {
    navigate('/manage/manageHome')
    onClose()
  }
  return (
    <Modal
      title='登记须知'
      open={open}
      width={960}
      onCancel={onCancel}
      rootClassName={styles.regMattersModal}
      mask={{ closable: false }}
      footer={
        <div className={styles.mattersFooter}>
          <Button type='primary' disabled={count > 0} onClick={onClose}>
            {count > 0 ? `同意并继续(${count})` : '同意并继续'}
          </Button>
        </div>
      }
    >
      <ol className={styles.mattersList}>
        <li>
          <span className={styles.mattersLabel}>1. 数据来源要求：</span>{' '}
          数据来源必须合法合规，需依据法定事由获取，严禁通过非法途径收集数据。
        </li>
        <li>
          <span className={styles.mattersLabel}>2. 合规性要求：</span>{' '}
          数据的收集、存储、使用、加工、传输、提供、公开等全环节，均需严格遵守《中华人民共和国网络安全法》《中华人民共和国数据安全法》《中华人民共和国个人信息保护法》等相关法律法规及监管规定。
        </li>
        <li>
          <span className={styles.mattersLabel}>3. 材料真实性承诺：</span>{' '}
          本单位在甘肃省公共数据资源登记平台提交的所有申请材料，均保证真实、完整、合法、有效，无任何虚假信息；材料内容不包含损害国家利益、社会公共利益、违背公序良俗及其他具有不良影响的内容。
        </li>
        <li>
          <span className={styles.mattersLabel}>4. 法律责任告知：</span>{' '}
          本单位已知晓并充分理解上述承诺内容，明确知晓若存在承诺不实或违背承诺的行为，将依法承担相应法律责任。
        </li>
      </ol>
    </Modal>
  )
}

export default RegMatters
