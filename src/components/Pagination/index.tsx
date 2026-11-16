import { Pagination as AntdPagination, PaginationProps } from 'antd'
const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  pageSize,
  onChange,
  ...rest
}) => {
  return (
    <AntdPagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={onChange}
      {...rest}
    />
  )
}

export default Pagination
