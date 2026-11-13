import { ProFormText } from "@ant-design/pro-components"
const StorageData = () => {
  return (
    <>
      <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
    </>
  )
}
export default StorageData