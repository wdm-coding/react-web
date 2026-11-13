import { useRequest as useRequestHook } from 'ahooks'
import type { Options } from 'ahooks/lib/useRequest/src/types';
interface ApiResponse<T> {
  code: number;
  message: string;
  data: {
    records: T[];
    total: number;
  };
}

export const useRequest = <T>(
  fetcher: (params?: any) => Promise<ApiResponse<T>>,
  options?: Options<any, any>,
)=> {
  const { run, data, loading, error, cancel, refresh, params,runAsync } = useRequestHook(
    async (params?: any): Promise<ApiResponse<T>> => {
      const res = await fetcher(params)
      return {
        code: res.code,
        message: res.message,
        data: res.data,
      }
    },
    {
      ...options,
    }
  )
  return {
    run,
    data: data?.data,
    loading,
    code: data?.code,
    message: data?.message,
    runAsync,
    params,
    refresh,
    cancel,
    error
  }
}
