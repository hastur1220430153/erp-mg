import ApiCommonRequest from '../service'

/**
 * 获取后台用户列表
 */
export function fetchBackUserList(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/user/info/list',
    method: 'GET',
    data,
  })
}

/**
 * 获取后台用户详情
 */
export function fetchBackUserDetail(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/user/info/detail',
    method: 'GET',
    data,
  })
}

/**
 * 新增后台用户
 */
export function addBackUser(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/user/add',
    method: 'POST',
    data,
  })
}

/**
 * 编辑后台用户
 */
export function editBackUser(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/user/info/edit',
    method: 'POST',
    data,
  })
}

/**
 * 编辑后台用户角色
 */
export function changeBackUserRole(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/user/role/edit',
    method: 'POST',
    data,
  })
}

/**
 * 超级管理员重置后台用户密码
 */
export function superResetBackUserPwd(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/password/reset',
    method: 'POST',
    data,
  })
}

/**
 * 获取角色下拉选项
 */
export function fetchRolesSelect() {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/dropdown/role',
    method: 'GET',
  })
}

/**
 * 获取权限下拉选项
 */
export function fetchPermissionsSelect() {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/dropdown/permission',
    method: 'GET',
  })
}

/**
 * 获取权限列表
 */
export function fetchPermissionList(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/permission/list',
    method: 'GET',
    data,
  })
}

/**
 * 修改权限数据
 */
export function editPermission(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/permission/edit',
    method: 'POST',
    data,
  })
}

/**
 * 获取角色的相关权限
 */
export function fetchPermissionsFromRole(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/role/permission/list',
    method: 'GET',
    data,
  })
}
/**
 * 增加角色的相关权限
 */
export function addPermissionsOfRole(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/role/permission/add',
    method: 'POST',
    data,
  })
}
/**
 * 移除角色的相关权限
 */
export function removePermissionsOfRole(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/role/permission/remove',
    method: 'POST',
    data,
  })
}

/**
 * 获取角色列表
 */
export function fetchRolesList(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/role/list',
    method: 'GET',
    data,
  })
}

/**
 * 新增角色
 */
export function addRole(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/role/add',
    method: 'POST',
    data,
  })
}
/**
 * 编辑角色
 */
export function editRole(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/role/edit',
    method: 'POST',
    data,
  })
}
