import { useEffect, useState } from 'react'
import { Table, type TableColumnsType } from 'antd'
import HomeApi, { type AreaRegisterStatistic } from '@/api/front/home.api'
import SectionHeader from '../../components/SectionHeader'
import styles from './index.module.scss'

const COLUMNS: TableColumnsType<AreaRegisterStatistic> = [
  { title: '登记地区', dataIndex: 'areaName', key: 'areaName' },
  { title: '登记申请（个）', dataIndex: 'applyCount', key: 'applyCount' },
  {
    title: '登记公示（个）',
    dataIndex: 'publicityCount',
    key: 'publicityCount'
  },
  { title: '异议申诉（个）', dataIndex: 'appealCount', key: 'appealCount' },
  { title: '确认单发放（项）', dataIndex: 'successCount', key: 'successCount' }
]

const DataOverview = () => {
  const [dataSource, setDataSource] = useState<AreaRegisterStatistic[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { code, data } = await HomeApi.getDataRegisterStatistic()
        if (code === 20000 && data) {
          setDataSource(data)
        }
      } catch {
        // 错误提示由响应拦截器统一处理
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section className={styles.dataSection}>
      <SectionHeader title='登记数据一览' />

      <div className={styles.tableWrapper}>
        <Table<AreaRegisterStatistic>
          rowKey='areaCode'
          columns={COLUMNS}
          dataSource={dataSource}
          loading={loading}
          pagination={false}
          size='middle'
          scroll={{ x: 900, y: 266 }}
        />
      </div>
    </section>
  )
}

export default DataOverview
