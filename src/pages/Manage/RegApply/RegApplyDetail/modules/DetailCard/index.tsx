import { ReactNode } from 'react'
import styles from './index.module.scss'
import { Card, Col, Row, Flex } from 'antd'
interface DetailCardProps {
  title: string
  detailData: Record<string, any>
  columns: {
    key: string
    label: string
    span?: number
    visible?: (record: any) => boolean
    render?: (record: any) => ReactNode
  }[]
}
const DetailCard = ({ title, detailData, columns }: DetailCardProps) => {
  return (
    <Card
      className={styles.detailCard}
      title={title}
      variant='borderless'
      style={{ width: '100%', borderRadius: 0 }}
    >
      {Object.keys(detailData || {}).length > 0 && columns.length > 0 ? (
        <Row gutter={[10, 15]}>
          {columns.map(
            (item) =>
              (item.visible?.(detailData) === true || !item.visible) && (
                <Col span={item.span || 8} key={item.label}>
                  <Flex>
                    <div className={styles.title}>{item.label}：</div>
                    <div className={styles.content}>
                      {item?.render
                        ? item.render(detailData) || '-'
                        : detailData?.[item.key] || '-'}
                    </div>
                  </Flex>
                </Col>
              )
          )}
        </Row>
      ) : (
        <div className={styles.empty}>暂无数据</div>
      )}
    </Card>
  )
}
export default DetailCard
