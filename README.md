# RegisterPortal

-- 登记平台客户端前端项目
-- node.js 22.16+

## 项目结构

```
RegisterPortal/
├── .env                          # 环境变量配置文件
├── .env.development              # 开发环境变量配置
├── .env.production               # 生产环境变量配置
├── .husky/                       # Git hooks 配置
│   ├── commit-msg                # 提交信息校验钩子
│   └── pre-commit                # 提交前校验钩子
├── .prettierrc                   # Prettier 格式化配置
├── .prettierignore
├── .trae/
│   └── rules/                    # AI 协作规则
│       ├── git-commit-message.md
│       └── project_rules.md
├── .vscode/
│   └── settings.json             # VS Code 配置
├── commitlint.config.js          # 提交信息规范校验配置
├── eslint.config.js              # ESLint 配置
├── index.html                    # 入口 HTML
├── package.json
├── public/                       # 公共静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/                      # API 接口
│   │   ├── auth.ts               # 认证相关接口
│   │   ├── common.ts             # 公共接口
│   │   ├── systemManage/         # 系统管理接口
│   │   │   └── menu.api.ts       # 菜单接口
│   │   └── user.ts               # 用户接口
│   ├── assets/                   # 静态资源
│   │   ├── font/                 # 字体文件
│   │   ├── images/               # 图片资源（登录、门户、首页等）
│   │   └── svg/                  # SVG 资源
│   ├── components/               # 公共组件
│   │   ├── AuthModal/            # 授权弹窗
│   │   ├── EllipsisText/         # 文本省略组件
│   │   ├── Icon/                 # 图标组件
│   │   ├── ImgCropUpload/        # 图片裁剪上传
│   │   └── Pagination/           # 分页组件
│   ├── hooks/                    # 自定义 Hooks
│   │   ├── useAuth.ts            # 授权逻辑
│   │   ├── useModal.ts           # 弹窗控制
│   │   ├── useRequest.ts         # 请求封装
│   │   └── useUploadConfig.ts    # 上传配置
│   ├── layouts/                  # 布局组件
│   │   ├── ManageLayout/         # 管理端布局（含顶部导航）
│   │   ├── PortalLayout/         # 门户端布局（含顶部导航）
│   │   └── components/           # 布局公共组件（菜单、页面容器）
│   ├── pages/                    # 页面级组件
│   │   ├── Login/                # 登录页
│   │   ├── Manage/               # 管理端页面
│   │   │   ├── FirstReg/         # 首次登记（表单分组配置）
│   │   │   ├── ManageHome/       # 管理端首页
│   │   │   └── RegApply/         # 登记申请（列表/数据）
│   │   ├── NotFound/             # 404 页面
│   │   ├── Portal/               # 门户页面
│   │   │   ├── DemandNumbers/    # 需求数量
│   │   │   ├── InforDisclosure/  # 信息公开
│   │   │   ├── PortalHome/       # 门户首页
│   │   │   ├── RegCheck/         # 登记查询/核验
│   │   │   ├── RegGuide/         # 登记指引
│   │   │   ├── RegInstitution/   # 登记机构
│   │   │   ├── RegPolicy/        # 登记政策
│   │   │   ├── RegPublic/        # 登记公示（含详情页）
│   │   │   ├── RegQuery/         # 登记查询
│   │   │   └── components/       # 门户公共组件（搜索头部）
│   │   └── SsoLogin/             # 单点登录页
│   ├── router/                   # 路由配置
│   │   ├── AppRouter/            # 路由出口
│   │   ├── Guard/                # 路由守卫（登录/权限）
│   │   ├── index.tsx             # 路由表
│   │   └── utils.tsx             # 路由工具函数
│   ├── services/                 # Axios 请求封装
│   │   ├── http.decorator.ts     # 请求装饰器
│   │   ├── index.ts              # 请求实例
│   │   └── types.ts              # 请求类型定义
│   ├── store/                    # 全局状态管理（zustand）
│   │   ├── index.ts
│   │   ├── modules/              # 状态模块（global/user）
│   │   └── types.ts
│   ├── styles/                   # 全局样式
│   │   ├── index.css
│   │   ├── index.scss
│   │   └── variables.scss        # SCSS 变量
│   ├── types/                    # 全局 TS 类型定义
│   │   └── index.ts
│   ├── utils/                    # 工具函数
│   │   ├── common.ts
│   │   ├── encrypt.ts            # 加密工具
│   │   ├── index.ts
│   │   └── menu.ts               # 菜单处理
│   ├── App.tsx                   # 应用入口组件
│   ├── main.tsx                  # 应用入口
│   └── vite-env.d.ts
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.app.json
├── tsconfig.json                 # TypeScript 配置
├── tsconfig.node.json
├── typings.d.ts                  # 全局类型声明
└── vite.config.ts                # Vite 构建配置
```

## 公共组件

1. AuthModal 全局登录认证弹窗
2. EllipsisText 文本省略组件

```tsx
import EllipsisText from '@/components/EllipsisText'
const Demo = () => {
  return (
    <div>
      <EllipsisText text='这是一个很长的文本,超过2行需要省略显示' line={2} />
    </div>
  )
}
```

3. Icon 图标组件

```tsx
import Icon from '@/components/Icon'
import { AntDesignOutlined } from '@ant-design/icons'
const imgIcon = new URL('@/assets/images/custom-icon.png', import.meta.url).href
const Demo = () => {
  return (
    <div>
      {/* antd 图标组件 */}
      <Icon name='AntDesignOutlined' />
      {/* 自定义svg图标 assets/svg/*.name */}
      <Icon name='svg-name' />
      {/* 图片链接组件 */}
      <Icon name={imgIcon} />
      {/* icon+ label 组件 */}
      <Icon
        name='AntDesignOutlined'
        label='这是一个图标'
        labelPosition='right'
        labelColor='red'
        labelSize={12}
      />
    </div>
  )
}
```

4. Pagination 分页组件 (参考antd 分页组件)

## 路由页面注册

router/index.tsx - 参考已有路由配置

## store 状态管理

1. 项目中无特殊情况，不使用localStorage或sessionStorage存储状态
2. 所有Storage状态都通过store-global-storage管理
3. 使用 hooks/useModel 状态管理 操作store的global模块和user模块

```ts
import { useModel } from '@/store'
const { storage, setItem, getItem, removeItem, clearStorage } =
  useModel('global')
const { userInfo } = useModel('user')

setItem('key', 'value')
const key = getItem('token')
removeItem('key')
clearStorage()

const Demo = () => {
  return (
    <div>
      <p>
        {storage?.key}
      </p>
      <p>
        {userInfo?.userName}
      </p>
    </div>
  )
}

export default Demo
```
