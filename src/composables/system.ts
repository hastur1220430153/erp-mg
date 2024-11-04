import UAParser from 'ua-parser-js'
import { useAuthStore } from '@/store'
import { isArray, isString } from '@/utils'

/** 获取设备信息 */
export function useDeviceInfo() {
	const parser = new UAParser()
	const result = parser.getResult()
	return result
}

/** 权限判断 */
export function usePermission() {
	const auth = useAuthStore()

	function hasPermission(permission: Auth.RoleType | Auth.RoleType[]) {
		const { roles } = auth.userInfo

		let has = roles.includes('Admin')

		if (!has) {
			if (isArray(permission)) {
				// has = (permission as Auth.RoleType[]).includes(userRole)
				has = permission.some(i => roles.includes(i))
			}
			if (isString(permission)) {
				// has = (permission as Auth.RoleType) === userRole
				has = roles.includes(permission)
			}
		}
		return has
	}

	return {
		hasPermission,
	}
}
