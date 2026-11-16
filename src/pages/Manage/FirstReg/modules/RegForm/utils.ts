// 1.转换树结构，添加key、value、title、selectable、isLeaf、disabled属性
export const transformTree = (tree: any[]) : any[] => {
  return tree.map((item: any) => {
    return {
      ...item,
      key: item.industryId,
      value: item.industryId,
      title: item.name,
      selectable: item.children && item.children.length === 0,
      isLeaf: item.children && item.children.length === 0,
      children:transformTree(item.children),
      disabled: false
    }
  })
}
// 2. 存储行业类型扁平化Map数组，方便查找
export const setIndustryMap = (industryMap:Map<string,any>,industryList: any[]) => {
  industryList.forEach((item) => {
    const ind: any = {
      name: item.name,
      industryId: item.industryId,
      levelType: item.levelType
    }
    if (item.parentId) {
      ind.parentId = item.parentId
    }
    industryMap.set(item.industryId, ind)
    if (item.children && item.children.length > 0) {
      setIndustryMap(industryMap,item.children)
    }
  })
}
// 3. 设置树数据disabled值
const setDisabled = (list: any[], bool: boolean): any[] => {
  return list.map((item: any) => ({
    ...item,
    disabled: bool,
    children: (item.children && item.children.length > 0) ? setDisabled(item.children, bool) : []
  }))
}
// 4. 递归查找展开的key
export const findExpandedKeys = (keys:any[],industryMap: Map<string, any>) => {
  const result:any[] = []
  keys.forEach((key) => {
    const industry = industryMap.get(key)
    result.push(industry?.parentId)
  })
  return result
}
// 5. 寻找选中的行业，直到找到levelType为1的行业
export const changeTreeData = (targetKey: string,industryMap: Map<string, any>,originTreeData: any) => {
  let secondIndustry = industryMap.get(targetKey)
  while (secondIndustry && secondIndustry.levelType !== 1) {
    secondIndustry = industryMap.get(secondIndustry?.parentId)
  }
  const newTreeData = originTreeData.map((item: any) => {
    return {
      ...item,
      disabled: item.industryId !== secondIndustry?.parentId,
      children: item.industryId !== secondIndustry?.parentId ? setDisabled(item.children, true) : item.children.map((child: any) => {
        return {
          ...child,
          disabled: child.industryId !== secondIndustry.industryId,
          children: child.industryId !== secondIndustry.industryId ? setDisabled(child.children, true) : child.children
        }
      })
    }
  })
  return {newTreeData,secondIndustry}
}
// 6. 组装选中的行业路径数据
export const assembleSelectedIndustry = (value: any,industryMap: Map<string, any>) => {
  // 过滤出所有3级行业
  const leafIndustry:any[] = []
  value.forEach((key: string) => {
    const industry = industryMap.get(key)
    if(industry.levelType === 3){
      leafIndustry.push(industry)
    }
  })

  // 使用set去重获取所有父行业id
  const parentIdsArray = Array.from(new Set(leafIndustry.map((item: any) => item.parentId)))
  
  // 递归查找父行业
  const parentIndustry = parentIdsArray.map((item: any) => industryMap.get(item))
  
  // 将leafIndustry 放在对应父行业children中
  const result:any[] = parentIndustry.map((item: any) => ({
    ...item,
    children: leafIndustry.filter((child: any) => child.parentId === item.industryId)
  }))
  
  return result
}