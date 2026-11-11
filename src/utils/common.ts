// 获取环境变量
export const getEnv = () => {
  switch (import.meta.env.MODE) {
    case 'development':
      return 'dev'
    case 'production':
      return 'prod'
    case 'test':
      return 'test'
    default:
      return 'dev'
  }
}