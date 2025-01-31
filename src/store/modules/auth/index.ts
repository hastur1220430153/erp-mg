import { unref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { api_login, api_get_user_info } from '@/api'
import { useRouterPush } from '@/composables'
import { localStg } from '@/utils'
import { $t } from '@/locales'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'
import { getToken, getUserInfo, clearAuthStorage } from './helpers'

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo
  /** 用户token */
  token: string
  /** 登录的加载状态 */
  loginLoading: boolean
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false)
      const { resetTabStore } = useTabStore()
      const { resetRouteStore } = useRouteStore()
      const route = unref(router.currentRoute)

      clearAuthStorage()
      this.$reset()

      // if (route.meta.requiresAuth) {
      //   toLogin();
      // }

      toLogin()

      nextTick(() => {
        resetTabStore()
        resetRouteStore()
      })
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.Token['token']) {
      const route = useRouteStore()
      const { toLoginRedirect } = useRouterPush(false)

      const loginSuccess = await this.loginByToken(backendToken)
      console.log('loginSuccess', loginSuccess)
      if (loginSuccess) {
        await route.initAuthRoute()

        // 跳转登录后的地址
        toLoginRedirect()

        // 登录成功弹出欢迎提示
        if (route.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', { userName: this.userInfo.nickname }),
            duration: 3000,
          })
        }

        return
      }

      // 不成功则重置状态
      this.resetAuthStore()
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.Token['token']) {
      let successFlag = false

      // 先把token存储到缓存中(后面接口的请求头需要token)
      const token = backendToken
      localStg.set('token', token)

      // 获取用户信息
      const res = await api_get_user_info()
      if (res.code === 200) {
        // 成功后把用户信息存储到缓存中
        localStg.set('userInfo', res.data)

        // 更新状态
        this.userInfo = res.data
        this.token = token

        successFlag = true
      }

      return successFlag
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async login(userName: string, password: string) {
      this.loginLoading = true
      const res = await api_login(userName, password)
      console.log('login', res)
      if (res.code === 200) {
        await this.handleActionAfterLogin(res.data.token)
      } else {
        window.$notification?.error({
          title: '登录失败',
          content: res.msg,
          duration: 2000,
        })
      }

      this.loginLoading = false
    },
    /**
     * 更换用户权限(切换账号)
     * @param userRole
     */
    async updateUserRole(userRole: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore()

      const accounts: Record<Auth.RoleType, { userName: string; password: string }> = {
        super: {
          userName: 'Super',
          password: 'super123',
        },
        admin: {
          userName: 'Admin',
          password: 'admin123',
        },
        user: {
          userName: 'User01',
          password: 'user01123',
        },
      }
      const { userName, password } = accounts[userRole]
      const res = await api_login(userName, password)
      if (res.code === 200) {
        await this.loginByToken(res.data)
        resetRouteStore()
        initAuthRoute()
      }
    },

    async updateUserInfo() {
      const res = await api_get_user_info()
      if (res.code === 200) {
        // 成功后把用户信息存储到缓存中
        localStg.set('userInfo', res.data)
        // 更新状态
        this.userInfo = res.data

        window.$message?.success('更新信息成功')
        return
      }
      window.$message?.success('更新信息失败')
    },
  },
})
