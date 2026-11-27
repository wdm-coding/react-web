import { Card, Flex, Steps, Table } from 'antd'
import styles from './index.module.scss'
import { useEffect } from 'react'
import useProcess from './useProcess'
const ProcessRecord = ({
  regApproType,
  status,
  taskDetails
}: {
  regApproType: string
  status: string
  taskDetails: any[]
}) => {
  const { items, current, dataSource, setItems, tabColumns } = useProcess(
    regApproType,
    status
  )

  useEffect(() => {
    setItems(taskDetails)
  }, [taskDetails])

  return (
    <div className={styles.processRecordWrapper}>
      <Card className={styles.processSteps}>
        <Steps current={current} titlePlacement='vertical' items={items} />
        <div className={styles.processRecordVertical}>
          <div className={styles.processRecordTitleText}>流程记录</div>
          <Flex style={{ width: '100%' }}>
            <Steps
              current={current}
              type='dot'
              orientation='vertical'
              titlePlacement='vertical'
              items={dataSource?.map(() => ({ title: '' }))}
              variant='outlined'
              className={styles.processTableSteps}
            />
            <Table
              rowKey={(record, index) => record.taskDetailsId}
              className={styles.processTable}
              columns={tabColumns}
              dataSource={dataSource}
              pagination={false}
            />
          </Flex>
        </div>
      </Card>
    </div>
  )
}

export default ProcessRecord
