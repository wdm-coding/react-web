import { ProFormText } from "@ant-design/pro-components"

const OpenData = () => {
  return (
    <>
      <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
    </>
  )
}
export default OpenData
