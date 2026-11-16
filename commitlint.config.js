/**
 * 提交信息校验：Conventional Commits 规范 + 中文描述
 * 示例：feat(login): 新增登录页
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 中文描述不受大小写风格约束
    'subject-case': [0],
    // 描述必须包含中文
    'subject-chinese': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'subject-chinese': ({ subject }) => [
          /[\u4e00-\u9fa5]/.test(subject ?? ''),
          '提交信息描述必须使用中文，例如：feat: 新增登录页'
        ]
      }
    }
  ]
}
