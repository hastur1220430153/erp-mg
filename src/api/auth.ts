import ApiCommonRequest from '@/service'

/**
 * 登录
 * @param username - 用户名
 * @param password - 密码
 */
export function api_login(username: string, password: string) {
  return ApiCommonRequest<any>({
    url: '/api/back/admin/login',
    method: 'POST',
    data: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/** 获取用户信息 */
export function api_get_user_info() {
  return ApiCommonRequest<ApiAuth.UserInfo>({
    url: '/api/back/admin/user/info',
    method: 'GET',
  })
}

/** 管理员重置后台用户的密码为用户名 */
export function api_reset_back_user_pwd_to_username(data: any) {
  return ApiCommonRequest({
    url: '/api/back/admin/password/reset',
    method: 'POST',
    data,
  })
}

/** 后台用户修改密码 */
export function api_reset_password(data: { old_password: string; new_password: string }) {
  return ApiCommonRequest({
    url: '/api/back/admin/password',
    method: 'POST',
    data,
  })
}

/**
 * 刷新token
 * @param refreshToken
 */
export function api_fetch_update_token(refreshToken: string) {
  return ApiCommonRequest<any>({
    url: '/updateToken',
    method: 'POST',
    data: { refreshToken },
  })
}
