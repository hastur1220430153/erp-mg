import type { AxiosResponse } from 'axios'
import Request from './request'
const baseURL = import.meta.env.VITE_PLATFORM_BACKEND_API

import { localStg } from '../utils'
import { getAxiosDebug } from '../utils/auth'
import type { RequestConfig } from './request/types'
// import { selectToken, state, syncState } from '../app/store'

interface SuccessResponse<T> {
  code: 200
  msg: string
  data: T
  total?: number
  total_page?: number
}

interface ErrorResponse<T> {
  code: -1
  msg: string
}

export type CommonResponse<T> = ErrorResponse<T> | SuccessResponse<T>

// 重写返回类型

interface CommonRequestConfig<T, R> extends RequestConfig<CommonResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL,
  timeout: 1000 * 60 * 5,
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      // if (config.isJson) {
      //   config.headers['Content-Type'] = 'application/json'
      // } else if (config.data) {
      //   config.headers['Content-Type'] = 'application/json'
      //   config.data = qs.stringify(config.data)
      // }

      const token = localStg.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse<CommonResponse<any>, any>) => {
      if (getAxiosDebug()) {
        console.log('http状态码', result.status)
        console.log('data状态码', result.data.code)
      }

      if (result.status === 401) {
        localStg.remove('token')
        return result
      }
      const dataCode = result?.data?.code || null
      switch (dataCode) {
        case 200:
          break

        default:
          break
      }
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {CommonRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ApiCommonRequest = <D = any, T = any>(config: CommonRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
    // console.log(config.params)
    delete config.data
  }
  return request.request<CommonResponse<T>>(config)
}
// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

export default ApiCommonRequest
