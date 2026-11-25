import { Avatar, Button, Card, Col, Flex, Row } from 'antd'
import { IdcardOutlined, LinkOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import accountApi from '@/api/account'
import { useRequest } from '@/hooks/useRequest'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import Field from '@/components/Field'
import { getEnumLabel } from '@/pages/Manage/Enum/index'
import type { AccountInfo } from '@/api/types/account'

// 日期格式化：2025/12/31
const formatDate = (value?: string) =>
  value ? dayjs(value).format('YYYY/M/D') : '-'
// 日期时间格式化：2026/11/25 22:51:38
const formatDateTime = (value?: string) =>
  value ? dayjs(value).format('YYYY/M/D HH:mm:ss') : '-'

const PersonInfo = () => {
  const { data, loading } = useRequest(() => accountApi.getAccountInfo())
  // 接口返回对象结构，与 useRequest 默认分页结构不同，此处断言为账号信息
  const info = data as unknown as AccountInfo | undefined
  // TODO: 待解绑接口就绪后接入
  const handleUnbind = () => {}
  return (
    <PageContainer title='账号信息' showBack={false}>
      <div className={styles.wrapper}>
        <Card loading={loading} style={{ marginBottom: 20 }}>
          <div style={{ padding: '20px 0' }}>
            <Flex align='center' className={styles.accountHead}>
              <Avatar size={64} className={styles.avatar}>
                {info?.userName?.charAt(0) || '-'}
              </Avatar>
              <div className={styles.companyInfo}>
                <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {info?.userName || '-'}
                </span>
                <Field label='账号:' value={info?.corpnIdNumber || '-'} />
              </div>
            </Flex>
            <Row gutter={[20, 20]} style={{ padding: '0 10px' }}>
              <Col span={8}>
                <Field label='联系电话:' value={info?.telephone || '-'} />
              </Col>
              <Col span={8}>
                <Field
                  label='创建时间:'
                  value={formatDate(info?.createdTime)}
                />
              </Col>
              <Col span={8}>
                <Field
                  label='最后登录时间:'
                  value={formatDateTime(info?.lastLoginTime)}
                />
              </Col>
              <Col span={8}>
                <Field
                  label='证件类型:'
                  value={getEnumLabel('idTypeEnum', info?.idType || '') || '-'}
                />
              </Col>
              <Col span={8}>
                <Field label='证件号码:' value={info?.idNumber || '-'} />
              </Col>
              <Col span={8}>
                <Field
                  label='证件有效期:'
                  value={`${formatDate(info?.idStartTime)} - ${formatDate(
                    info?.idEndTime
                  )}`}
                />
              </Col>
            </Row>
          </div>
        </Card>
        <Card title='所属主体信息' loading={loading}>
          <Flex
            align='center'
            justify='space-between'
            style={{ padding: '10px 0' }}
          >
            <Flex align='center'>
              <Avatar
                shape='square'
                size={56}
                className={styles.idcard}
                icon={<IdcardOutlined />}
              />
              <div className={styles.companyInfo}>
                <Flex align='center' gap={8}>
                  <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {info?.institutionName || '-'}
                  </span>
                  <Button
                    type='link'
                    size='small'
                    icon={<LinkOutlined />}
                    onClick={handleUnbind}
                  >
                    解绑
                  </Button>
                </Flex>
                <Field
                  label='统一社会信用代码:'
                  value={info?.institutionCode || '-'}
                />
              </div>
            </Flex>
            <div className={styles.fielditem}>
              <Field
                label='登记主体性质:'
                value={
                  getEnumLabel(
                    'institutionTypeEnum',
                    info?.institutionType || ''
                  ) || '-'
                }
              />
            </div>
            <div className={styles.fielditem}>
              <Field
                label='注册国家:'
                value={getEnumLabel('countryEnum', info?.country || '') || '-'}
              />
            </div>
            <div className={styles.fielditem}>
              <Field label='注册地址:' value={info?.region || '-'} />
            </div>
            <div className={styles.stamp}>
              已认证
              <span className={styles.stars}>★ ★ ★</span>
            </div>
          </Flex>
        </Card>
      </div>
    </PageContainer>
  )
}
export default PersonInfo
