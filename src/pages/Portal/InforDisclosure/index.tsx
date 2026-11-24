import { useMemo, useState } from 'react'
import { Button, Input, Select, Table } from 'antd'
import type { TableProps } from 'antd'
import styles from './index.module.scss'
import { CATS, DOMAIN, type ServiceItem, services } from './data'

const InforDisclosure = () => {
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('')
  const [page, setPage] = useState(1)

  const dataSource = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter((s) => {
      if (category && s.cat !== category) return false
      if (!q) return true
      return [s.name, s.code, s.path, s.desc, s.cat, s.callers].some((v) =>
        v.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  const handleSearch = () => {
    setQuery(keyword)
    setPage(1)
  }

  const handleReset = () => {
    setKeyword('')
    setQuery('')
    setCategory('')
    setPage(1)
  }

  const columns: TableProps<ServiceItem>['columns'] = [
    {
      title: '调用状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ServiceItem['status']) => (
        <span className={styles.status}>
          <span className={styles.statusDot} />
          {status === 'online' ? '在线' : status}
        </span>
      )
    },
    {
      title: '服务接口名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
      render: (name: string) => (
        <span className={styles.serviceName}>{name}</span>
      )
    },
    {
      title: '接口编码',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code, 'zh-CN'),
      render: (code: string) => <span className={styles.monoText}>{code}</span>
    },
    {
      title: '类型',
      dataIndex: 'cat',
      key: 'cat',
      sorter: (a, b) => a.cat.localeCompare(b.cat, 'zh-CN')
    },
    {
      title: '域名',
      key: 'domain',
      render: () => (
        <span className={styles.monoEllipsis}>https://{DOMAIN}</span>
      )
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      render: (path: string) => (
        <span className={styles.monoEllipsis}>{path}</span>
      )
    },
    {
      title: '调用方式',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => (
        <span className={styles.monoText}>{method}</span>
      )
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      sorter: (a, b) => a.version.localeCompare(b.version, 'zh-CN'),
      render: (version: string) => (
        <span className={styles.monoText}>{version}</span>
      )
    }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={styles.pageHead}>
          <h1 className={styles.title}>服务清单</h1>
        </div>

        <div className={styles.toolbarCard}>
          <Input
            className={styles.searchInput}
            placeholder='请输入接口名称 / 编码 / 路径'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <Select
            className={styles.categorySelect}
            value={category}
            onChange={(value) => {
              setCategory(value)
              setPage(1)
            }}
            options={[
              { value: '', label: '全部' },
              ...CATS.map((c) => ({ value: c, label: c }))
            ]}
          />
          <Button type='primary' onClick={handleSearch}>
            搜 索
          </Button>
          <Button onClick={handleReset}>重 置</Button>
        </div>

        <div className={styles.tableCard}>
          <Table<ServiceItem>
            rowKey='code'
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1060 }}
            locale={{ emptyText: '未找到匹配的接口，请调整搜索或筛选条件。' }}
            pagination={{
              current: page,
              onChange: setPage,
              pageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50],
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default InforDisclosure
