import type { StateCreator } from 'zustand'
import type { SystemSlice } from '../types'
import SystemApi from '@/api/system'

const createSystemSlice: StateCreator<
  SystemSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  SystemSlice
> = (set, get) => ({
  doorTitle: '',
  platformTitle: '',
  // 获取系统配置（门户标题、平台标题），已缓存时跳过请求
  fetchSystemConfig: async () => {
    const { doorTitle, platformTitle } = get()
    if (doorTitle && platformTitle) return
    const res = await SystemApi.getSystemConfig({ pageSize: 999 })
    if (res?.code !== 20000) return
    const configMap = (res.data?.content || []).reduce<Record<string, string>>(
      (map, item) => {
        if (item.keyName) map[item.keyName] = item.value
        return map
      },
      {}
    )
    set((state) => {
      state.doorTitle = configMap.doorTitle || state.doorTitle
      state.platformTitle = configMap.platformTitle || state.platformTitle
    })
  }
})

export default createSystemSlice
