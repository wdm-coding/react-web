import { useState } from 'react'
import type { Key } from 'react'
import { Tree } from 'antd'
import { useRequest } from '@/hooks/useRequest'
import CommonApi from '@/api/common'
import { transformTree } from './utils'

interface IndustryNode {
  key: Key
  disabled?: boolean
  children?: IndustryNode[]
  [field: string]: any
}

/**
 * 刷新行业树的可选状态：
 * 1. 仅「根 -> 选中二级行业」链路上的节点可选（enabledKeys）
 * 2. 选中节点（subTreeRootKey）下的整棵子树可选
 * 3. 其余节点全部禁用
 * @param enabledKeys 链路节点 key 集合（选中节点及其祖先）
 * @param subTreeRootKey 选中节点 key，其子树全部可选
 * @param inSubTree 当前节点是否已位于选中节点的子树中
 */
const markTreeDisabled = (
  list: IndustryNode[],
  enabledKeys: Set<Key>,
  subTreeRootKey?: Key,
  inSubTree = false
): IndustryNode[] =>
  list.map(({ children, ...node }) => {
    const selectable = inSubTree || enabledKeys.has(node.key)
    return {
      ...node,
      disabled: !selectable,
      children: children?.length
        ? markTreeDisabled(
            children,
            enabledKeys,
            subTreeRootKey,
            inSubTree || node.key === subTreeRootKey
          )
        : []
    }
  })

const useIndusTree = () => {
  const [industryTree, setIndustryTree] = useState<any[]>([])
  const [treeData, setTreeData] = useState<any[]>([])
  const [levelTwo, setLevelTwo] = useState<any>(null)
  const { getPath } = Tree.useTree(industryTree, {})
  useRequest(CommonApi.getIndustryTree, {
    onSuccess: ({ code, data }) => {
      if (code === 20000) {
        const treeData = transformTree(data || [])
        setIndustryTree(treeData)
        setTreeData(treeData)
      }
    }
  })
  const createTreeData = (id: string | null) => {
    if (!id) {
      setTreeData(industryTree)
      return
    }
    const path = getPath(id) || []
    const result = path.find((item) => item.level === 1)
    if (levelTwo?.key === result?.key) return
    setLevelTwo(result)
    const newData = markTreeDisabled(
      industryTree,
      new Set(path.map((item) => item.key)),
      result?.key
    )
    setTreeData(newData)
  }
  return {
    industryTreeData: treeData,
    createTreeData
  }
}

export default useIndusTree
