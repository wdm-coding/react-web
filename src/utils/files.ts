import FileApi from '@/api/file'
// 下载文件
export const downloadFile = async (value: string) => {
  const params = value?.split('/')
  if (params?.length !== 4) {
    window.$message.error('文件路径错误')
    return
  }
  try {
    await FileApi.downloadFile({
      dataRegistCode: params[0],
      field: params[1],
      fieldMd5: params[2],
      fileName: params[3]
    })
    window.$message.success('下载文件成功')
  } catch (error) {
    window.$message.error('下载文件失败')
  }
}
