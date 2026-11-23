import { useState } from 'react'
import type { Key } from 'react'
import { Tree } from 'antd'
import { useRequest } from '@/hooks/useRequest'
import CommonApi from '@/api/common'

interface IndustryNode {
  key: Key
  disabled?: boolean
  children?: IndustryNode[]
  [field: string]: any
}

// 1.转换树结构，添加key、value、title、selectable、isLeaf、disabled属性
const transformTree = (tree: any[]): any[] => {
  return tree.map((item: any) => {
    return {
      ...item,
      key: item.industryId,
      value: item.industryId,
      title: item.name,
      selectable: item.children && item.children.length === 0,
      isLeaf: item.children && item.children.length === 0,
      children: transformTree(item.children),
      disabled: false
    }
  })
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

// 获取industryIds中的二级，三级行业id
const getIndustryIds = (list: any[], getPath: any) => {
  const path = getPath(list[list.length - 1]?.value)
  const filters =
    path[path.length - 1]?.nodes?.filter(
      (item) => item.levelType === 2 || item.levelType === 3
    ) || []
  return filters.map((item) => item.key)
}

// 获取树结构最后一级行业id数组
const getLastLevelIndustryIds = (tree: any[]) => {
  const ids = []
  function traverse(list) {
    list.forEach((node) => {
      if (!node) return
      const children = node.children
      if (Array.isArray(children) && children.length > 0) {
        traverse(children)
      } else {
        // 没有 children 或 children 为空数组 → 叶子节点
        if (node.industryId != null) {
          ids.push({
            value: node.industryId,
            label: node.name
          })
        }
      }
    })
  }
  traverse(tree)
  return ids
}

// 根据industryIds构建树
function buildTreeByIds(source, ids) {
  // 1. 建立 industryId -> 原始节点 的索引，并记录 parent 链所需信息
  var index = new Map()
  function walk(node) {
    if (!node) return
    index.set(node.industryId, node)
    ;(node.children || []).forEach(walk)
  }
  ;(Array.isArray(source) ? source : [source]).forEach(walk)
  // 沿 parentId 链向上找到 levelType === 1 的祖先节点（含自身若自身就是 level1）
  function findLevel1Ancestor(node) {
    var cur = node
    var guard = 0
    while (cur && cur.levelType !== 1 && guard < 100) {
      cur = index.get(cur.parentId)
      guard++
    }
    return cur && cur.levelType === 1 ? cur : null
  }
  // 规范化：仅保留 5 个字段
  function normalize(node) {
    return {
      name: node.name,
      industryId: node.industryId,
      levelType: node.levelType,
      parentId: node.parentId
    }
  }
  // 2. 为每个命中 id 生成规范化节点
  var resultById = new Map()
  ids.forEach(function (id) {
    var node = index.get(id)
    if (!node) return
    resultById.set(id, normalize(node))
  })
  // 3. 组装：命中根(level1)复用其规范化节点；非命中根从 index 补齐，去重
  var roots = []
  var rootByKey = new Map() // industryId -> 根规范化节点
  function ensureRoot(level1Node) {
    if (!level1Node) return null
    var key = level1Node.industryId
    if (rootByKey.has(key)) return rootByKey.get(key)
    var root = resultById.get(key) || normalize(level1Node)
    rootByKey.set(key, root)
    roots.push(root)
    return root
  }
  ids.forEach(function (id) {
    var rn = resultById.get(id)
    if (!rn) return
    var original = index.get(id)
    var parentNode = resultById.get(original.parentId)
    if (parentNode) {
      if (!parentNode.children) parentNode.children = []
      parentNode.children.push(rn)
    } else {
      var root = ensureRoot(findLevel1Ancestor(original))
      if (root) {
        if (!root.children) root.children = []
        // 避免根自身被重复挂到 children（当命中节点本身就是 level1 时）
        if (root.industryId !== rn.industryId) {
          root.children.push(rn)
        }
      } else {
        roots.push(rn) // 兜底：找不到 level1 祖先时仍作顶层
      }
    }
  })
  // 4. 去掉空的 children 字段（叶子节点不保留 children）
  function finalize(node) {
    if (node.children && node.children.length) {
      node.children.forEach(finalize)
    } else {
      delete node.children
    }
  }
  roots.forEach(finalize)
  return roots
}

const useIndusTree = () => {
  const [industryTree, setIndustryTree] = useState<any[]>([]) // 行业树数据
  const [treeData, setTreeData] = useState<any[]>([]) // 处理后的树数据
  const [levelTwo, setLevelTwo] = useState<any>(null) // 选中的二级行业
  const [industryIds, setIndustryIds] = useState<any[]>([]) // 选中的二级，三级行业id
  const [industryList, setIndustryList] = useState<any[]>([]) // 选中的二级，三级行业
  const { getPath } = Tree.useTree(industryTree, {}) // 获取路径
  useRequest(CommonApi.getIndustryTree, {
    onSuccess: ({ code, data }) => {
      if (code === 20000) {
        const treeData = transformTree(data || [])
        setIndustryTree(treeData)
        setTreeData(treeData)
      }
    }
  })
  // 刷新树数据
  const createTreeData = (ids: any[] | null) => {
    if (!ids) {
      setLevelTwo(null)
      setTreeData(industryTree)
      setIndustryIds([])
      setIndustryList([])
      return
    }
    const indKeys = getIndustryIds(ids, getPath)
    const newIndustryIds = [...new Set([...industryIds, ...indKeys])]
    setIndustryIds(newIndustryIds)
    const firstId = ids[0]?.value
    const path = getPath(firstId) || []
    const result = path.find((item) => item.level === 1)
    const tree = buildTreeByIds(industryTree, newIndustryIds)
    setIndustryList(tree)
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
    createTreeData,
    industryName: levelTwo?.node?.name || '',
    industryList,
    getLastLevelIndustryIds
  }
}

export default useIndusTree
