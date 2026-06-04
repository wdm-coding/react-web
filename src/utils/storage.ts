const BASE_KEY = 'WDM_REACT_WEB_'
const Cache_TYPE = sessionStorage
// 获取数据
export function getItem(key: string) {
  try {
    return JSON.parse(Cache_TYPE.getItem(`${BASE_KEY}${key}`) as string)
  } catch (error) {
    return Cache_TYPE.getItem(`${BASE_KEY}${key}`) || ''
  }
}
// 存储数据
export function setItem(key: string, value: any) {
  Cache_TYPE.setItem(`${BASE_KEY}${key}`, JSON.stringify(value))
}
// 移除数据
export function removeItem(key: string) {
  Cache_TYPE.removeItem(`${BASE_KEY}${key}`)
}
// 清除所有数据
export function clearCache() {
  Cache_TYPE.clear()
}
// 获取token
export const getToken = () => getItem('token') || ''

// 存储token
export const setToken = (token: string) => setItem('token', token)

// 清除token
export const clearToken = () => removeItem('token')

const Storage = {
  getItem,
  setItem,
  removeItem,
  clearCache,
  getToken,
  setToken,
  clearToken
}
export default Storage
