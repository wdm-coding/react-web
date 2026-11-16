import { ProFormText } from "@ant-design/pro-components"

const ShareData = () => {
  return (
    <>
      <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
    </>
  )
}
export default ShareData
