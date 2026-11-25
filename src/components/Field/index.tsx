import { Flex } from 'antd'

const Field = ({
  label,
  value,
  gap = 15
}: {
  label: string
  value: string
  gap?: number
}) => {
  return (
    <Flex align='center' className='field' gap={gap}>
      <div>{label}</div>
      <div>{value}</div>
    </Flex>
  )
}

export default Field
