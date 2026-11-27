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
// 获取环境变量
export const getEnvConfig = (): EnvConfig => {
  const config = {
    mode: envEmun[import.meta.env.MODE],
    loginType: import.meta.env.VITE_LOGIN_TYPE
  }
  return config
}

// 生成唯一id
export const uuid = () => {
  return crypto.randomUUID()
}
