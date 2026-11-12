import { ProForm, ProFormText } from '@ant-design/pro-components'
const RegForm = () => {
  return (
    <ProForm>
      <ProForm.Group title='数据基本信息'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='委托代理信息'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='数据存储信息'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='数据场景说明'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='数据共享开放信息'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='共有数据信息'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='数据目录信息'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
      <ProForm.Group title='数据合规性来源及承诺'>
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
      </ProForm.Group>
    </ProForm>
  )
}

export default RegForm