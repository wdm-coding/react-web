import { Card, Col, Flex, Row } from 'antd'
import accountApi from '@/api/account'
import { useRequest } from '@/hooks/useRequest'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import Field from '@/components/Field'
import logo from '@/assets/images/manage/company-logo.png'
import Icon from '@/components/Icon'
const RegSubjectInfo = () => {
  const { data, loading } = useRequest(() => accountApi.getAccountInfo())
  return (
    <PageContainer title='账号信息' showBack={false}>
      <div className={styles.wrapper}>
        <Card title='主体信息' loading={loading} style={{ marginBottom: 20 }}>
          <Flex>
            <Icon name={logo} />
            <Flex
              align='center'
              style={{ minWidth: '80%' }}
              justify='space-between'
            >
              <div className={styles.companyInfo}>
                <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {data?.institutionName || '-'}{' '}
                </span>
                <Field
                  label='统一社会信用代码:'
                  value={data?.institutionCode || '-'}
                />
              </div>
              <div className={styles.fielditem}>
                <Field label='机构类型:' value={data?.institutionType || '-'} />
              </div>
              <div className={styles.fielditem}>
                <Field label='注册国家:' value={data?.country || '-'} />
              </div>
              <div className={styles.fielditem}>
                <Field label='区划名称:' value={data?.region || '-'} />
              </div>
            </Flex>
          </Flex>
        </Card>
        <Card title='法人信息' loading={loading}>
          <div style={{ padding: '0px 20px' }}>
            <Row
              style={{ border: '1px solid #e8e8e8', padding: 20 }}
              gutter={[20, 20]}
            >
              <Col span={12}>
                <Field label='法人名称:' value={data?.corpnName || '-'} />
              </Col>
              <Col span={12}>
                <Field
                  label='法人身份证号:'
                  value={data?.corpnIdNumber || '-'}
                />
              </Col>
              <Col span={12}>
                <Field label='颁发机构:' value={data?.idValidIssued || '-'} />
              </Col>
              <Col span={12}>
                <Field
                  label='法人手机号:'
                  value={data?.corpnTelephone || '-'}
                />
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}
export default RegSubjectInfo
