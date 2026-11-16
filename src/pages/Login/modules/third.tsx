import { useState } from 'react'
import styles from './index.module.scss'
const items = [
  {
    key:'gkb',
    label:'甘肃省统一身份认证平台登录',
    desc:'已在甘肃政务服务网注册用户登录',
    icon:new URL('@/assets/images/login/gkb-icon.png', import.meta.url).href,
  },
  {
    key:'accPwd',
    label:'账号密码登录',
    desc:'已在甘肃政务服务网注册用户登录',
    icon:new URL('@/assets/images/login/acc-pwd.png', import.meta.url).href,
  }
]
const ThirdLogin = () => {
  const [activeKey, setActiveKey] = useState<'gkb' | 'accPwd'>('gkb')
  const clickItem = (item:any) => {
    setActiveKey(item.key)
  }
  return (
      <div className={styles.loginCard}>
        <h2 className={styles.welcome}>欢迎登录</h2>
        <div className={styles.divider}>选择登录方式</div>
        {
            items.map((item) => (
              <div key={item.key} className={[styles.optionItem, activeKey === item.key ? styles.active : ''].join(' ')} onClick={() => clickItem(item)}>
                <img
                  className={styles.optionIcon}
                  src={item.icon}
                  alt={item.label}
                />
                <div className={styles.optionContent}>
                  <div className={styles.optionTitle}>{item.label}</div>
                  <div className={styles.optionDesc}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))
          }
      </div>
  )
}

export default ThirdLogin
