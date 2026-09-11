import { Drawer } from 'antd'
import { ReactNode, useState } from 'react'

const RDrawer = ({
  title,
  onClose,
  open,
  children,
  width = 600
}: {
  title: string
  onClose: () => void
  open: boolean
  children: ReactNode
  width?: number
}) => {
  return (
    <Drawer
      size={width}
      title={title}
      closable={{ placement: 'end' }}
      onClose={onClose}
      open={open}
      destroyOnHidden={true}
      styles={{
        body: {
          padding: 0
        }
      }}
    >
      {children}
    </Drawer>
  )
}
export default RDrawer
