import { uuid } from '@/utils/common'
import { Button, Flex } from 'antd'
import { useMemo } from 'react'
import { downloadFile } from '@/utils/files'

const FileView = ({ files }: { files: string | string[] }) => {
  const list = useMemo(() => {
    if (!files) return []

    if (Array.isArray(files)) {
      return files
    }
    return (
      files?.split(',')?.map((item) => ({
        uid: uuid(),
        name: item.split('/').pop(),
        path: item
      })) || []
    )
  }, [files])
  return (
    <Flex gap={0}>
      {list.map((item, index) => (
        <Button
          type='link'
          key={item.uid}
          style={{ height: 20, padding: '0 5px' }}
          onClick={() => downloadFile(item.path)}
        >
          {item.name}
          {index < list.length - 1 && <span>、</span>}
        </Button>
      ))}
    </Flex>
  )
}

export default FileView
