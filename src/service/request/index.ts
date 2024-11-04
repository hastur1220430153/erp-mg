import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { localStg } from '~/src/utils'
import { getAxiosDebug } from '../../utils/auth'
import type { CreateRequestConfig, RequestConfig, RequestInterceptors } from './types'
import { useRouterPush } from '~/src/composables'
const { toLogin } = useRouterPush(false)
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
const handle401Msg = useDebounceFn(() => {
  window.$message?.warning('登录已过期，请重新登录')
}, 300)

const handle422Msg = useDebounceFn(msg => {
  window.$message?.error(`422: ${msg || ''}`)
}, 300)

const handleCommonMsg = useDebounceFn(msg => {
  window.$message?.error(`网络错误: ${msg || ''}`)
}, 300)

class Request {
  // axios 实例
  instance: AxiosInstance

  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>

  // * 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config)
    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map()
    this.interceptorsObj = config.interceptors
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController()
        const url = res.url || ''
        res.signal = controller.signal
        this.abortControllerMap.set(url, controller)
        return res
      },
      (err: any) => err,
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        const url = res.config.url || ''
        this.abortControllerMap.delete(url)
        return res.data
      },
      (err: any) => {
        console.dir(err)
        const statusCode = err?.response?.status
        console.log('响应错误, 状态码:', statusCode)
        // const { errorMessage } = this.snackValue

        switch (statusCode) {
          case 401:
            console.log('未认证', statusCode)
            localStg.remove('token')
            toLogin()
            handle401Msg()

            // 若是401 直接抛错返回登录页, 不用提示额外的错误
            throw err

            break
          case 403:
            console.log('无权限', statusCode)
            break
          case 422:
            console.log('传参错误', statusCode, err?.response?.data?.msg)
            handle422Msg(err?.response?.data?.msg || err?.message)
            break
          case 500:
            console.log('服务器爆炸', statusCode)
            break
          case 501:
            console.log('服务器爆炸', statusCode)
            break
          case 502:
            console.log('服务器爆炸', statusCode)
            break
          case 503:
            console.log('服务器爆炸', statusCode)
            break

          default:
            console.log('其他错误', statusCode, err)

            handleCommonMsg(err?.response?.data?.msg || err?.message)

            break
        }
        // throw err
        return err
      },
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    if (getAxiosDebug()) {
      console.log('发送的初始config', config)
    }

    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          if (getAxiosDebug()) {
            console.log('响应成功', res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          if (getAxiosDebug()) {
            console.log('响应失败', err)
          }
          reject(err)
        })
      // .finally(() => {})
    })
  }

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }

  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }
}

export default Request
export { RequestConfig, RequestInterceptors }
