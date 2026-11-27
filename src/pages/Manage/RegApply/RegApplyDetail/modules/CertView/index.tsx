import { Button, Card } from 'antd'
import { CheckCircleFilled, DownloadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import { certificateStatusEnum } from '@/pages/Manage/Enum'
type CertInfo = {
  dataRegistName: string // 登记数据名称
  certificateBase64: string // 证书base64编码
  certificateCode: string // 证书编号
  certificateStatus: string // 证书状态
  validityPeriodStartTime: string // 证书有效期开始时间
  cvalidityDeadline: string // 证书有效期结束时间
}
const CertView = ({ certInfo }: { certInfo: CertInfo }) => {
  // 证书状态信息
  const statusItem = certificateStatusEnum.find(
    (item) => item.value === certInfo?.certificateStatus
  )
  const statusText =
    certInfo?.certificateStatus === '001'
      ? '登记成功'
      : statusItem?.label || '登记成功'
  const statusColor = statusItem?.color || '#52C41A'
  // 证书图片
  const certImg = certInfo?.certificateBase64?.startsWith('data:')
    ? certInfo.certificateBase64
    : `data:image/jpeg;base64,${certInfo?.certificateBase64 || ''}`
  // 格式化有效期
  const formatDate = (value: string) =>
    value ? dayjs(value).format('YYYY-MM-DD') : '--'
  // 下载确认单
  const onDownload = () => {
    if (!certInfo?.certificateBase64) {
      window.$message.error('确认单文件不存在')
      return
    }
    const link = document.createElement('a')
    link.href = certImg
    link.download = `${certInfo?.dataRegistName || '登记确认单'}.png`
    link.click()
  }
  return (
    <Card className={styles.certView} variant='borderless'>
      <div className={styles.certTitle}>{certInfo?.dataRegistName}</div>
      <div className={styles.certBanner}>
        {certInfo?.certificateBase64 && (
          <img className={styles.certThumb} src={certImg} alt='登记确认单' />
        )}
        <div className={styles.certInfo}>
          <div className={styles.certStatus} style={{ color: statusColor }}>
            <CheckCircleFilled />
            <span>{statusText}</span>
          </div>
          <div className={styles.certValidity}>
            登记有效期: {formatDate(certInfo?.validityPeriodStartTime)} ~{' '}
            {formatDate(certInfo?.cvalidityDeadline)}
          </div>
        </div>
        <Button type='primary' icon={<DownloadOutlined />} onClick={onDownload}>
          下载确认单
        </Button>
      </div>
    </Card>
  )
}

export default CertView
