import {
  ActionType,
  PageContainer,
  ProCard,
  ProTable
} from '@ant-design/pro-components'
import { Button, Space } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { PlusOutlined } from '@ant-design/icons'
import UserApi from '@/api/user.api'
import dayjs from 'dayjs'
import UserForm from './modules/UserForm'
import RDrawer from '@/components/RDrawer'

const UserManage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const actionRef = useRef<ActionType>(null)
  const navigate = useNavigate()
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return text === 1 ? '正常' : '禁用'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => {
        return (
          <Space>
            <Button key='edit' type='primary'>
              编辑
            </Button>
            <Button key='delete'>删除</Button>
          </Space>
        )
      }
    }
  ]
  const onClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <PageContainer
        onBack={() => {
          navigate(-1)
        }}
        header={{
          title: '用户管理',
          ghost: true,
          breadcrumb: {
            items: [
              {
                title: '系统管理',
                onClick: () => {
                  navigate('/manage/dashboard')
                }
              },
              {
                title: '用户管理'
              }
            ]
          }
        }}
      >
        <ProCard direction='column' ghost style={{ border: 'none' }}>
          <ProTable<any, any>
            rowKey='id'
            actionRef={actionRef}
            toolBarRender={() => [
              <Button
                key='button'
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpen(true)
                }}
                type='primary'
              >
                新增用户
              </Button>
            ]}
            columns={columns}
            request={async (
              params: any & {
                pageSize: number
                current: number
              }
            ) => {
              const { code, data } = await UserApi.getUserList({
                pageNum: params.current,
                pageSize: params.pageSize
              })
              if (code === 0) {
                return {
                  data: data.list,
                  success: true,
                  total: data.total
                }
              } else {
                return {
                  data: [],
                  success: false,
                  total: 0
                }
              }
            }}
          />
        </ProCard>
      </PageContainer>
      <RDrawer title='用户表单' open={open} onClose={onClose}>
        <UserForm />
      </RDrawer>
    </div>
  )
}
export default UserManage
