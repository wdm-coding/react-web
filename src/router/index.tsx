export interface RouterItem {
  path: string
  name: string
  redirect?: string
  componentPath?: string
  icon?: string
  title?: string
  children?: RouterItem[]
}
export const whitePaths = [
  '/',
  '/ssoLogin',
  '/404',
  '/login',
  '/portal',
  '/portal/home',
  '/portal/regPublic',
  '/portal/regPublicDetail',
  '/portal/regCheck',
  '/portal/regQuery',
  '/portal/regQueryDetail',
  '/portal/regPolicy',
  '/portal/regPolicyDetail',
  '/portal/regInstitution',
  '/portal/demandNumbers',
  '/portal/demandNumbersDetail',
  '/portal/inforDisclosure',
  '/portal/inforDisclosureDetail',
  '/portal/regGuide'
]
export const list: RouterItem[] = [
  {
    path: '/portal',
    name: 'Portal',
    componentPath: 'PortalLayout',
    children: [
      {
        path: 'home',
        name: 'Home',
        componentPath: '/Portal/PortalHome/index.tsx',
        icon: 'home',
        title: '首页'
      },
      {
        path: 'regGuide',
        name: 'RegGuide',
        componentPath: '/Portal/RegGuide/index.tsx',
        icon: 'reg-guide',
        title: '登记指南'
      },
      {
        path: 'regPublic',
        name: 'RegPublic',
        componentPath: '/Portal/RegPublic/index.tsx',
        icon: 'reg-public',
        title: '登记公示'
      },
      {
        path: 'regPublicDetail',
        name: 'RegPublicDetail',
        componentPath: '/Portal/RegPublic/Detail/index.tsx',
        icon: 'reg-public-detail',
        title: '登记公示详情'
      },
      {
        path: 'regCheck',
        name: 'RegCheck',
        componentPath: '/Portal/RegCheck/index.tsx',
        icon: 'reg-check',
        title: '登记核验'
      },
      {
        path: 'regQuery',
        name: 'RegQuery',
        componentPath: '/Portal/RegQuery/index.tsx',
        icon: 'reg-query',
        title: '登记查询'
      },
      {
        path: 'regQueryDetail',
        name: 'RegQueryDetail',
        componentPath: '/Portal/RegQuery/Detail/index.tsx',
        icon: 'reg-query-detail',
        title: '资源详情'
      },
      {
        path: 'regPolicy',
        name: 'RegPolicy',
        componentPath: '/Portal/RegPolicy/index.tsx',
        icon: 'reg-policy',
        title: '登记政策'
      },
      {
        path: 'regPolicyDetail',
        name: 'RegPolicyDetail',
        componentPath: '/Portal/RegPolicy/Detail/index.tsx',
        icon: 'reg-policy-detail',
        title: '政策详情'
      },
      {
        path: 'regInstitution',
        name: 'RegInstitution',
        componentPath: '/Portal/RegInstitution/index.tsx',
        icon: 'reg-apply',
        title: '登记机构'
      },
      {
        path: 'demandNumbers',
        name: 'DemandNumbers',
        componentPath: '/Portal/DemandNumbers/index.tsx',
        icon: 'demand-numbers',
        title: '用数需求'
      },
      {
        path: 'demandNumbersDetail',
        name: 'DemandNumbersDetail',
        componentPath: '/Portal/DemandNumbers/Detail/index.tsx',
        icon: 'demand-numbers-detail',
        title: '需求详情'
      },
      {
        path: 'inforDisclosure',
        name: 'InforDisclosure',
        componentPath: '/Portal/InforDisclosure/index.tsx',
        icon: 'infor-disclosure',
        title: '信息披露'
      },
      {
        path: 'inforDisclosureDetail',
        name: 'InforDisclosureDetail',
        componentPath: '/Portal/InforDisclosure/Detail/index.tsx',
        icon: 'infor-disclosure-detail',
        title: '信息披露详情'
      }
    ]
  },
  {
    path: '/manage',
    name: 'Manage',
    componentPath: 'ManageLayout',
    icon: 'manager',
    title: '控制台',
    children: [
      {
        path: 'manageHome',
        name: 'ManageHome',
        componentPath: '/Manage/ManageHome/index.tsx',
        icon: 'home',
        title: '首页'
      },
      {
        path: 'firstReg/:type',
        name: 'FirstReg',
        componentPath: '/Manage/FirstReg/index.tsx',
        icon: 'first-reg',
        title: '首次登记'
      },
      {
        path: 'regApply',
        name: 'RegApply',
        componentPath: 'Outlet',
        icon: 'reg-apply',
        title: '登记申请',
        children: [
          {
            path: 'regApplyList',
            name: 'RegApplyList',
            componentPath: '/Manage/RegApply/RegApplyList/index.tsx',
            icon: 'reg-apply-list',
            title: '登记数据申请'
          },
          {
            path: 'regDataQuery',
            name: 'RegDataQuery',
            componentPath: '/Manage/RegApply/RegDataQuery/index.tsx',
            icon: 'reg-query',
            title: '登记数据查询'
          },
          {
            path: 'regApplyDetail',
            name: 'RegApplyDetail',
            componentPath: '/Manage/RegApply/RegApplyDetail/index.tsx',
            icon: 'reg-apply-detail',
            title: '登记申请详情'
          }
        ]
      },
      {
        path: 'certManage',
        name: 'CertManage',
        componentPath: '/Manage/CertManage/index.tsx',
        icon: 'certificate-manage',
        title: '确认单管理'
      },
      {
        path: 'objection',
        name: 'Objection',
        componentPath: 'Outlet',
        icon: 'objection',
        title: '异议申诉管理',
        children: [
          {
            path: 'mySubmit',
            name: 'MySubmit',
            componentPath: '/Manage/Objection/MySubmit/index.tsx',
            icon: 'my-submit',
            title: '我提交的'
          },
          {
            path: 'myReceive',
            name: 'MyReceive',
            componentPath: '/Manage/Objection/MyReceive/index.tsx',
            icon: 'my-receive',
            title: '我接收的'
          }
        ]
      },
      {
        path: 'personAccount',
        name: 'PersonAccount',
        componentPath: 'Outlet',
        icon: 'person-info',
        title: '个人信息',
        children: [
          {
            path: 'personInfo',
            name: 'PersonInfo',
            componentPath: '/Manage/PersonInfo/index.tsx',
            icon: 'person-info',
            title: '个人信息'
          },
          {
            path: 'personApplyRecord',
            name: 'PersonApplyRecord',
            componentPath: '/Manage/UserManage/ApplyRecord/index.tsx',
            icon: 'apply-record',
            title: '申请邀请记录'
          }
        ]
      },
      {
        path: 'regSubjectInfo',
        name: 'RegSubjectInfo',
        componentPath: '/Manage/RegSubjectInfo/index.tsx',
        icon: 'reg-subject-info',
        title: '登记主体信息'
      },
      {
        path: 'approvalManage',
        name: 'ApprovalManage',
        componentPath: 'Outlet',
        icon: 'approval-manage',
        title: '审批待办',
        children: [
          {
            path: 'todoApproval',
            name: 'TodoApproval',
            componentPath: '/Manage/ApprovalManage/TodoApproval/index.tsx',
            icon: 'todo-approval',
            title: '我的待办'
          },
          {
            path: 'completeApproval',
            name: 'CompleteApproval',
            componentPath: '/Manage/ApprovalManage/CompleteApproval/index.tsx',
            icon: 'complete-approval',
            title: '我的办结'
          }
        ]
      },
      {
        path: 'userManage',
        name: 'UserManage',
        componentPath: 'Outlet',
        icon: 'user-manage',
        title: '用户管理',
        children: [
          {
            path: 'instUserList',
            name: 'InstUserList',
            componentPath: '/Manage/UserManage/InstUserList/index.tsx',
            icon: 'inst-user-list',
            title: '机构用户管理'
          },
          {
            path: 'applyRecord',
            name: 'ApplyRecord',
            componentPath: '/Manage/UserManage/ApplyRecord/index.tsx',
            icon: 'apply-record',
            title: '申请邀请记录'
          }
        ]
      },
      {
        path: 'demandNumbersManager',
        name: 'DemandNumbersManager',
        componentPath: '/Manage/DemandNumbersManager/index.tsx',
        icon: 'demand-numbers',
        title: '用数需求'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    componentPath: '/Login/index.tsx'
  },
  {
    path: '/ssoLogin',
    name: 'SsoLogin',
    componentPath: '/SsoLogin/index.tsx'
  },
  {
    path: '/404',
    name: 'NotFound',
    componentPath: '/NotFound/index.tsx'
  }
]
