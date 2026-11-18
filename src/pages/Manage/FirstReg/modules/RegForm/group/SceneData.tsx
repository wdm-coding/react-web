import { ProFormTextArea } from '@ant-design/pro-components'
import { tooltips, rules } from '../config'
const SceneData = () => {
  return (
    <>
      <ProFormTextArea
        name='ableScene'
        label='数据场景'
        placeholder='请输入数据场景'
        tooltip={tooltips.ableScene}
        rules={rules.sceneData.ableScene}
        fieldProps={{
          maxLength: 1000,
          showCount: true
        }}
      />
      <ProFormTextArea
        name='disableScene'
        label='禁用场景'
        placeholder='请输入禁用场景'
        tooltip={tooltips.disableScene}
        rules={rules.sceneData.disableScene}
        fieldProps={{
          maxLength: 1000,
          showCount: true
        }}
      />
    </>
  )
}
export default SceneData
