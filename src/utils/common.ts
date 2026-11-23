// 获取环境变量
interface EnvConfig {
  mode: 'dev' | 'prod' | 'test'
  loginType: 'local' | 'third'
}
const envEmun = {
  development: 'dev',
  production: 'prod',
  test: 'test'
}
export const getEnvConfig = (): EnvConfig => {
  const config = {
    mode: envEmun[import.meta.env.MODE],
    loginType: import.meta.env.VITE_LOGIN_TYPE
  }
  return config
}

export const uuid = () => {
  // 生成唯一 整数id
  return crypto.randomUUID()
}
