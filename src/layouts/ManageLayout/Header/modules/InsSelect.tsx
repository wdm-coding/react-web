import { Button, Table } from 'antd'
import styles from '../index.module.scss'
import useModal from '@/hooks/useModal'
type DataType = {
  country: string
  institutionCode: string
  institutionName: string
  institutionType: string
  region: string
  subjectRegistrationId: string
}
const InsSelect = () => {
  const { userInfo } = useModal('user')
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1
    },
    {
      title: '登记主体名称',
      dataIndex: 'institutionName',
      key: 'institutionName'
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'institutionCode',
      key: 'institutionCode'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span>当前主体</span>
          {userInfo?.insList?.length !== 1 && (
            <>
              <Button
                type='text'
                size='small'
                onClick={() => record.subjectRegistrationId}
                style={{ margin: '10px 0' }}
                disabled={userInfo?.insList?.length === 1}
              >
                切换
              </Button>
              <Button
                type='text'
                size='small'
                onClick={() => record.subjectRegistrationId}
                disabled={userInfo?.insList?.length === 1}
              >
                设为默认主体
              </Button>
            </>
          )}
        </div>
      )
    }
  ]
  return (
    <div className={styles.insSelect}>
      <Table<DataType> pagination={false} columns={columns} dataSource={userInfo?.insList || []} />
    </div>
  )
}
export default InsSelect
