import {
  ProFormTextArea,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { rules } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'
import { normalizeText } from '../utils/index'
import { useMemo } from 'react'
interface DataSourceProps {
  uploadOnlyId?: string
  setUploadCount?: any
  regApproType?: string
}
const UpdateReason: React.FC<DataSourceProps> = ({
  uploadOnlyId,
  setUploadCount,
  regApproType
}) => {
  const supplementLabel = useMemo(() => {
    switch (regApproType) {
      case '2':
        return '变更原因'
      case '3':
        return '更正原因'
      case '4':
        return '注销原因'
      default:
        return '补充说明'
    }
  }, [regApproType])
  const proofMaterialsLabel = useMemo(() => {
    switch (regApproType) {
      case '2':
        return '变更证明材料'
      case '3':
        return '更正证明材料'
      case '4':
        return '注销证明材料'
      case '5':
        return '续展证明材料'
      default:
        return '证明材料'
    }
  }, [regApproType])
  return (
    <>
      <ProFormTextArea
        name='supplement'
        label={supplementLabel}
        normalize={normalizeText}
        rules={rules.changeData.supplement}
        fieldProps={{
          maxLength: 200,
          showCount: true
        }}
      />
      <ProFormUploadButton
        title='上传'
        label={proofMaterialsLabel}
        name='proofMaterials'
        max={5}
        rules={rules.changeData.proofMaterials}
        extra={
          <div style={{ paddingTop: 10 }}>
            支持上传jpg、png、pdf、jpeg格式，每个文件大小不能超过5M，支持上传多个文件，最多支持5个
          </div>
        }
        fieldProps={{
          ...useCustomUpload({
            maxSizeMB: 5,
            accept: ['.jpg', '.png', '.pdf', '.jpeg'],
            setUploadCount,
            extraParams: {
              dataRegistCode: uploadOnlyId,
              field: 'proofMaterials'
            }
          })
        }}
      />
      <ProFormUploadButton
        title='上传'
        label='申请承诺函'
        name='applyForProof'
        max={5}
        rules={rules.changeData.applyForProof}
        extra={
          <div style={{ paddingTop: 10 }}>
            支持上传jpg、png、pdf、jpeg格式，每个文件大小不能超过5M，支持上传多个文件，最多支持5个
          </div>
        }
        fieldProps={{
          ...useCustomUpload({
            maxSizeMB: 5,
            accept: ['.jpg', '.png', '.pdf', '.jpeg'],
            setUploadCount,
            extraParams: {
              dataRegistCode: uploadOnlyId,
              field: 'proofMaterials'
            }
          })
        }}
      />
      {(regApproType === '4' || regApproType === '5') && (
        <ProFormUploadButton
          title='上传'
          label='其他证明材料'
          name='otherProofMaterials'
          max={5}
          rules={rules.changeData.otherProofMaterials}
          extra={
            <div style={{ paddingTop: 10 }}>
              支持上传jpg、png、pdf、jpeg格式，每个文件大小不能超过5M，支持上传多个文件，最多支持5个
            </div>
          }
          fieldProps={{
            ...useCustomUpload({
              maxSizeMB: 5,
              accept: ['.jpg', '.png', '.pdf', '.jpeg'],
              setUploadCount,
              extraParams: {
                dataRegistCode: uploadOnlyId,
                field: 'proofMaterials'
              }
            })
          }}
        />
      )}
    </>
  )
}
export default UpdateReason
