import FilterPanel, {
  type FilterRow
} from '@/pages/Portal/components/FilterPanel'
import type { IndustryItem } from '@/api/portal/demandNumbers'

const DATA_TYPE_OPTIONS = [
  { label: '公共数据资源', value: '1' },
  { label: '公共数据产品和服务', value: '2' },
  { label: '开放数据资源', value: '3' }
]

interface DemandFilterProps {
  dataType: string | null
  industryId: string | null
  industryList: IndustryItem[]
  onChangeDataType: (value: string | null) => void
  onChangeIndustry: (value: string | null) => void
}

const DemandFilter = ({
  dataType,
  industryId,
  industryList,
  onChangeDataType,
  onChangeIndustry
}: DemandFilterProps) => {
  const rows: FilterRow[] = [
    {
      key: 'dataType',
      label: '登记数据类型',
      options: DATA_TYPE_OPTIONS,
      value: dataType,
      onChange: onChangeDataType
    },
    {
      key: 'industry',
      label: '行业名称',
      options: industryList.map((item) => ({
        label: item.name,
        value: item.industryId
      })),
      value: industryId,
      onChange: onChangeIndustry
    }
  ]

  return <FilterPanel rows={rows} />
}

export default DemandFilter
