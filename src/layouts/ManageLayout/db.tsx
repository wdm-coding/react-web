import Icon from '@/components/Icon'
import MenuLabel from '@/layouts/components/Menus/MenuLabel'
const siderMenus = [
  {
    label: '首页',
    key: '/manage/manageHome',
    icon: 'svg-vite'
  },
  {
    label: '登记申请',
    key: '/manage/regApply',
    icon: 'AndroidOutlined',
    children: [
      {
        label: '登记数据申请',
        key: '/manage/regApply/regApplyList'
      },
      {
        label: '登记数据查询',
        key: '/manage/regApply/regDataQuery'
      }
    ]
  },
  {
    label: '确认单管理',
    key: '/manage/certManage',
    icon: 'AndroidOutlined'
  },
  {
    label: <MenuLabel label='异议申诉管理' dot />,
    key: '/manage/objection',
    icon: 'AndroidOutlined',
    children: [
      {
        label: <MenuLabel label='我提交的' badge={10} />,
        key: '/manage/objection/mySubmit'
      },
      {
        label: <MenuLabel label='我接收的' badge={10} />,
        key: '/manage/objection/myReceive'
      }
    ]
  },
  {
    label: '个人账号管理',
    key: '/manage/personAccount',
    icon: 'AndroidOutlined',
    children: [
      {
        label: '个人基本信息',
        key: '/manage/personAccount/personInfo'
      },
      {
        label: '申请邀请记录',
        key: '/manage/personAccount/personApplyRecord'
      }
    ]
  },
  {
    label: '登记主体信息',
    key: '/manage/regSubjectInfo',
    icon: 'AndroidOutlined'
  },
  {
    label: <MenuLabel label='审批待办' dot />,
    key: '/manage/approvalManage',
    icon: 'AndroidOutlined',
    children: [
      {
        label: <MenuLabel label='我的待办' badge={10} />,
        key: '/manage/approvalManage/todoApproval'
      },
      {
        label: <MenuLabel label='我的办结' badge={10} />,
        key: '/manage/approvalManage/completeApproval'
      }
    ]
  },
  {
    label: '用户管理',
    key: '/manage/userManage',
    icon: 'AndroidOutlined',
    children: [
      {
        label: '机构用户管理',
        key: '/manage/userManage/instUserList'
      },
      {
        label: '申请邀请记录',
        key: '/manage/userManage/applyRecord'
      }
    ]
  },
  {
    label: '用数需求',
    key: '/manage/demandNumbersManager',
    icon: 'AndroidOutlined'
  },
  {
    label: '年度信息披露',
    key: '/manage/annualDisclosure',
    icon: 'AndroidOutlined',
    children: [
      {
        label: '实施机构管理',
        key: '/manage/annualDisclosure/implManage'
      },
      {
        label: '运营机构管理',
        key: '/manage/annualDisclosure/operManage'
      }
    ]
  },
  {
    label: '系统管理',
    key: '/manage/systemManage',
    icon: 'AndroidOutlined',
    children: [
      {
        label: '系统设置',
        key: '/manage/systemManage/systemSetting'
      },
      {
        label: '日志管理',
        key: '/manage/systemManage/logManage'
      }
    ]
  }
]

const transformItems = (menus: any[]) => {
  return menus.map((item: any) => {
    if (item.icon) {
      item.icon = <Icon name={item.icon} />
    }
    if (item.children) {
      item.children = transformItems(item.children)
    }
    return item
  })
}

export const siderMenusItems = transformItems(siderMenus)
