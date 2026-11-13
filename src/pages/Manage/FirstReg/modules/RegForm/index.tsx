import styles from '../../index.module.scss'

import { ProForm, ProFormInstance } from '@ant-design/pro-components'
import BaseData from './group/BaseData'
import ProxyData from './group/ProxyData'
import StorageData from './group/StorageData'
import SceneData from './group/SceneData'
import OpenData from './group/OpenData'
import ShareData from './group/ShareData'
import DirecData from './group/DirecData'
import DataSource from './group/DataSource'
import { useRef } from 'react'
const RegForm = () => {
  const formRef = useRef<ProFormInstance>(null);
  const groupTitle = (title: string) => {
    return (
      <div key={title} className={styles.groupTitle}>
        <span style={{ paddingLeft: 10 }}>{title}</span>
      </div>
    )
  }
  const onFinish = async (values: any) => {
    console.log(values)
  }
  return (
    <ProForm
      layout='horizontal'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      formRef={formRef}
      onFinish={onFinish}
      initialValues={{
        dataRegisteType: '1',
        authOperatType: '1',
        authResourcDevelop: '1',
        dataProductAndServicesType: '1',
        dataType: '1',
      }}
    >
      <ProForm.Group title={groupTitle('数据基本信息')}>
        <BaseData />
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
        <ShareData />
      </ProForm.Group>
      <ProForm.Group title={groupTitle('数据目录信息')}>
        <DirecData />
      </ProForm.Group>
      <ProForm.Group title={groupTitle('数据合规性来源及承诺')}>
        <DataSource />
      </ProForm.Group>
    </ProForm>
  )
}

export default RegForm
