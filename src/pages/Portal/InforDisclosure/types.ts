import type { DisclosureType } from '@/api/portal/inforDisclosure'

/** 页面 Tab：imp-实施机构，opt-运营机构 */
export type DisclosureTabKey = 'imp' | 'opt'

export const DISCLOSURE_TYPE: Record<DisclosureTabKey, DisclosureType> = {
  imp: 1,
  opt: 2
}

export const DISCLOSURE_TABS = [
  { key: 'imp', label: '实施机构' },
  { key: 'opt', label: '运营机构' }
]
