import { getEnumLabel } from '@/pages/Manage/Enum'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
type ProcessItem = {
  title: string
  subTitle?: string
  description?: string
  taskDetailsId?: string | number
}
const splitTime = (data: string) => {
  const [day, time] = dayjs(data)
    ?.format('YYYY-MM-DD HH:mm:ss')
    ?.split(' ') || ['', '']
  return {
    subTitle: day,
    description: time
  }
}
const processEnum = [
  {
    regApproType: '1',
    list: ['首次登记申请', '业务受理', '业务审核', '数据公示', '发放确认单']
  },
  {
    regApproType: '2',
    list: ['变更提交登记申请', '业务受理', '业务审核', '数据公示', '发放确认单']
  },
  {
    regApproType: '3',
    list: ['更正登记申请', '业务受理', '业务审核', '数据公示', '发放确认单']
  }
]
const tabColumns = [
  {
    title: '处理时间',
    dataIndex: 'processingTime',
    key: 'processingTime',
    render: (text: string) => {
      return text || '-'
    }
  },
  {
    title: '流程进度',
    dataIndex: 'processType',
    key: 'processType',
    render: (text: string) => {
      return text || '-'
    }
  },
  {
    title: '审批机构',
    dataIndex: 'institutionName',
    key: 'institutionName',
    render: (text: string) => {
      return text || '-'
    }
  },
  {
    title: '操作人',
    dataIndex: 'operatorName',
    key: 'operatorName',
    render: (text: string) => {
      return text || '-'
    }
  },
  {
    title: '处理结果',
    dataIndex: 'result',
    key: 'result',
    render: (text: string) => {
      return text || '-'
    }
  },
  {
    title: '意见',
    dataIndex: 'description',
    key: 'description',
    render: (text: string) => {
      return text || '-'
    }
  },
  {
    title: '处理用时',
    dataIndex: 'operationTime',
    key: 'operationTime',
    render: (text: string) => {
      return text || '-'
    }
  }
]
const useProcess = (regApproType: string, status: string) => {
  const [items, setItems] = useState<ProcessItem[]>([])
  const [current, setCurrent] = useState<number>(0)
  const [dataSource, setDataSource] = useState<ProcessItem[]>([])
  const beseProcess = useMemo(
    () =>
      processEnum.find((item: any) => item.regApproType === regApproType)
        ?.list || [],
    [regApproType]
  )
  const _setItems = (taskDetails: any[]) => {
    const list = taskDetails?.map((item: any, index: number) => {
      if (index === 0) {
        return {
          title: `${getEnumLabel('regApproTypeEnum', regApproType)}申请`,
          ...splitTime(item.processingTime)
        }
      } else {
        return {
          title: item.processType,
          ...splitTime(item.processingTime)
        }
      }
    })
    let concatList = []
    if (['拒绝登记', '退回补正'].includes(status)) {
      const lastElement = list.pop()
      concatList.push({
        title: status,
        subTitle: lastElement?.subTitle || '',
        description: lastElement?.description || '',
        status: 'error'
      })
    } else if (status === '登记通过') {
      concatList = beseProcess
        .slice(taskDetails.length)
        .map((item: string) => ({
          title: item,
          subTitle: '',
          description: ''
        }))
      concatList.push({
        title: '发放确认单',
        subTitle: '',
        description: '',
        status: 'finish'
      })
    } else if (status === '已撤销') {
      concatList.push({
        title: status,
        subTitle: '',
        description: '',
        status: 'error'
      })
    } else {
      concatList = beseProcess
        .slice(taskDetails.length)
        .map((item: string) => ({
          title: item,
          subTitle: '',
          description: ''
        }))
    }

    console.log('list', list, concatList)
    const resultList = list.concat(concatList)
    setCurrent(
      ['登记通过', '已撤销'].includes(status)
        ? resultList.length - 1
        : taskDetails.length - 1
    )
    setItems(resultList)
    const tableList = taskDetails.map((item: any) => ({
      ...item,
      processingTime: dayjs(item.processingTime)?.format('YYYY-MM-DD HH:mm:ss')
    }))
    setDataSource(tableList)
  }
  return {
    items,
    current,
    setItems: _setItems,
    tabColumns,
    dataSource
  }
}
export default useProcess
