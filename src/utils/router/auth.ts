/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(routes: AuthRoute.Route[], permission: Auth.RoleType) {
	return routes.map(route => filterAuthRouteByUserPermission(route, permission)).flat(1)
}

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param permission - 权限
 */
function filterAuthRouteByUserPermission(
	route: AuthRoute.Route,
	permission: Auth.UserInfo['roles'],
): AuthRoute.Route[] {
	const filterRoute = { ...route }
	const hasPermission =
		!route.meta.permissions ||
		permission?.includes('Admin') ||
		route.meta.permissions?.some(i => permission?.includes(i))
	// !route.meta.permissions || permission.includes('Admin') || route.meta.permissions.includes(permission)
	// console.log('有权限吗', permission, hasPermission)
	if (filterRoute.children) {
		const filterChildren = filterRoute.children.map(item => filterAuthRouteByUserPermission(item, permission)).flat(1)
		Object.assign(filterRoute, { children: filterChildren })
	}
	return hasPermission ? [filterRoute] : []
}
