import { Badge } from "antd"

interface Props {
  label: string,
  badge?: number,
  dot?: boolean
}
const MenuLabel = ({ label, badge, dot }: Props) => {
  return (
    <div>
      <Badge dot={dot} count={badge}  offset={dot ? [4, 0] : [18, 0]}>
        {label}
      </Badge>
    </div>
  )
}

export default MenuLabel
