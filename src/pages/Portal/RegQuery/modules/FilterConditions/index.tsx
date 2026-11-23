import { useEffect, useState } from 'react'
import FilterPanel, {
  type FilterOption,
  type FilterRow
} from '@/pages/Portal/components/FilterPanel'
import PortalCommonApi, {
  GANSU_AREA_CODE,
  type PortalAreaItem
} from '@/api/portal/common'
import { DATA_REGIST_TYPE_OPTIONS } from '@/dict'

/** 资源查询条件 */
export interface RegQueryFilters {
  /** 登记数据类型，null 表示全部 */
  dataRegistType: string | null
  /** 登记地区 code，null 表示全部 */
  coverageArea: string | null
  /** 行业 id，null 表示全部 */
  industry: string | null
}

/** 查询条件默认值：全部 */
export const DEFAULT_FILTERS: RegQueryFilters = {
  dataRegistType: null,
  coverageArea: null,
  industry: null
}

interface Props {
  value: RegQueryFilters
  onChange: (value: RegQueryFilters) => void
}

/** 资源查询条件模块：登记数据类型、登记地区、行业名称 */
const FilterConditions = ({ value, onChange }: Props) => {
  const [areaOptions, setAreaOptions] = useState<FilterOption[]>([])
  const [industryOptions, setIndustryOptions] = useState<FilterOption[]>([])

  useEffect(() => {
    let ignore = false
    const fetchOptions = async () => {
      try {
        const [areaRes, industryRes] = await Promise.all([
          PortalCommonApi.getPortalAreaList(),
          PortalCommonApi.getIndustryList()
        ])
        if (ignore) return
        const gansu = areaRes?.data?.find(
          (item: PortalAreaItem) => item.code === GANSU_AREA_CODE
        )
        setAreaOptions(
          (gansu?.children ?? []).map((item) => ({
            label: item.name,
            value: item.code
          }))
        )
        setIndustryOptions(
          (industryRes?.data ?? []).map((item) => ({
            label: item.successCount
              ? `${item.name}(${item.successCount})`
              : item.name,
            value: item.industryId
          }))
        )
      } catch {
        // 错误提示由响应拦截器统一处理
      }
    }
    fetchOptions()
    return () => {
      ignore = true
    }
  }, [])

  const rows: FilterRow[] = [
    {
      key: 'dataRegistType',
      label: '登记数据类型',
      options: DATA_REGIST_TYPE_OPTIONS,
      value: value.dataRegistType,
      onChange: (dataRegistType) => onChange({ ...value, dataRegistType })
    },
    {
      key: 'coverageArea',
      label: '登记地区',
      options: areaOptions,
      value: value.coverageArea,
      onChange: (coverageArea) => onChange({ ...value, coverageArea })
    },
    {
      key: 'industry',
      label: '行业名称',
      options: industryOptions,
      value: value.industry,
      onChange: (industry) => onChange({ ...value, industry })
    }
  ]

  return <FilterPanel rows={rows} />
}

export default FilterConditions
