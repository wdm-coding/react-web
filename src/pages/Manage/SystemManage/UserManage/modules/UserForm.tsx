import { ProForm, ProFormText } from '@ant-design/pro-components'
import { useRef } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd'
import ImgCropUpload from '@/components/ImgCropUpload'

const UserForm = () => {
  const formRef = useRef<any>(null)
  const onFinish = (values: any) => {
    console.log('onFinish', values)
  }
  return (
    <div className={styles.userForm}>
      <div className={styles.formContainer}>
        <ProForm
          formRef={formRef}
          layout='horizontal'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          submitter={false}
          onFinish={onFinish}
        >
          <ProForm.Item
            name='avatar'
            label='头像'
            rules={[{ required: true, message: '请上传头像' }]}
          >
            <ImgCropUpload />
          </ProForm.Item>
          <ProFormText
            name='username'
            label='用户名'
            rules={[{ required: true, message: '请输入用户名' }]}
          />
          <ProFormText
            name='nickname'
            label='昵称'
            rules={[{ required: true, message: '请输入昵称' }]}
          />
          <ProFormText
            name='email'
            label='邮箱'
            rules={[{ required: true, message: '请输入邮箱' }]}
          />
          <ProFormText
            name='phone'
            label='手机号'
            rules={[{ required: true, message: '请输入手机号' }]}
          />
          <ProFormText
            name='address'
            label='地址'
            rules={[{ required: true, message: '请输入地址' }]}
          />
        </ProForm>
      </div>
      <div className={styles.footerContainer}>
        <Button
          type='primary'
          htmlType='submit'
          onClick={() => {
            formRef.current?.submit()
          }}
        >
          提交
        </Button>
        <Button
          type='default'
          onClick={() => {
            formRef.current?.resetFields()
          }}
        >
          重置
        </Button>
      </div>
    </div>
  )
}
export default UserForm
