import { ProFormTextArea } from '@ant-design/pro-components'
import { tooltips, rules } from '../config'
import { normalizeText } from '../utils/index'
const SceneData = () => {
  return (
    <>
      <ProFormTextArea
        name='ableScene'
        label='数据场景'
        placeholder='请输入数据场景'
        normalize={normalizeText}
        tooltip={tooltips.ableScene}
        rules={rules.sceneData.ableScene}
        fieldProps={{
          maxLength: 1000,
          showCount: true
        }}
        extra={
          <div style={{ paddingTop: 10, color: '#666' }}>
            样例：该用水数据经过加工处理的可以为金融机构信贷业务提供信息支持。在信贷反欺诈、贷前审批、额度管理和贷后监测等业务环节，金融机构可以从用水视角评估企业经营健康状况，消减金融机构与企业间的信息不对称，进一步完善金融机构对企业信用评价的指标体系。
          </div>
        }
      />
      <ProFormTextArea
        name='disableScene'
        label='禁用场景'
        placeholder='请输入禁用场景'
        normalize={normalizeText}
        tooltip={tooltips.disableScene}
        rules={rules.sceneData.disableScene}
        fieldProps={{
          maxLength: 1000,
          showCount: true
        }}
        extra={
          <div style={{ paddingTop: 10, color: '#666' }}>
            样例： 1.未经许可，不得将数据用于商业广告或营销推广。
            2.禁止将数据用于任何可能损害公共利益或国家安全的活动。
            3.不得将数据泄露给未经授权的第三方，特别是竞争对手。
            4.不得用于侵犯企业隐私或违反法律法规的活动。
            5.未经批准，不得擅自将相关数据传输至境外。
          </div>
        }
      />
    </>
  )
}
export default SceneData
