import styles from './index.module.scss'
import { ProForm, ProFormInstance } from '@ant-design/pro-components'
import BaseData from './group/BaseData'
import ProxyData from './group/ProxyData'
import StorageData from './group/StorageData'
import SceneData from './group/SceneData'
import OpenData from './group/OpenData'
import ShareData from './group/ShareData'
import DirecData from './group/DirecData'
import DataSource from './group/DataSource'
import { useRef, useState } from 'react'
import FileApi from '@/api/file'
import { useRequest } from '@/hooks/useRequest'
import { Button, Flex } from 'antd'
const RegForm = () => {
  const formRef = useRef<ProFormInstance>(null)
  const { data: uploadOnlyId } = useRequest(FileApi.getFileUploadOnlyId)
  const [uploadCount, setUploadCount] = useState<number>(0)
  const groupTitle = (title: string) => {
    return (
      <div key={title} className={styles.groupTitle}>
        <span style={{ paddingLeft: 10 }}>{title}</span>
      </div>
    )
  }
  const onFinish = async (values: any) => {
    if (uploadCount !== 0) {
      window.$message.warning('请等待文件上传完成')
      return
    }
    console.log(values)
  }
  const onSaveDraft = () => {
    console.log(formRef.current?.getFieldsValue())
  }
  return (
    <div className={styles.regFormContainer}>
      <ProForm
        style={{ padding: 20 }}
        layout='horizontal'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        formRef={formRef}
        onFinish={onFinish}
        initialValues={{
          dataRegistType: '1',
          authOperationStatus: '1',
          dataType: '1',
          dataProductAndServicesType: '1',
          authResourceDevelop: '1',
          productUsage: '1'
        }}
        submitter={false}
      >
        <ProForm.Group title={groupTitle('数据基本信息')}>
          <BaseData uploadOnlyId={uploadOnlyId} setUploadCount={setUploadCount} />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('委托代理信息')}>
          <ProxyData />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('数据存储信息')}>
          <StorageData />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('数据场景说明')}>
          <SceneData />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('数据共享开放信息')}>
          <OpenData />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('共有数据信息')}>
          <ShareData uploadOnlyId={uploadOnlyId} setUploadCount={setUploadCount} />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('数据目录信息')}>
          <DirecData />
        </ProForm.Group>
        <ProForm.Group title={groupTitle('数据合规性来源及承诺')}>
          <DataSource />
        </ProForm.Group>
      </ProForm>
      <div style={{ height: 40 }}></div>
      <div className={styles.customSubmitter}>
        <Flex justify='flex-end' gap={10}>
          <Button type='default' onClick={() => formRef.current?.resetFields()}>
            重置
          </Button>
          <Button type='primary' onClick={() => formRef.current?.submit()}>
            提交
          </Button>
          <Button type='default' onClick={onSaveDraft}>
            保存
          </Button>
        </Flex>
      </div>
    </div>
  )
}

export default RegForm
