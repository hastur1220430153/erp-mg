declare namespace ApiManagement {
	// 增加后台用户的参数
	interface AddBackUserProps {
		nickname: string
		username: string
		password: string
		role_id: any
	}

	// 编辑后台用户的参数
	interface EditBackUserProps {
		id: any
		summary: string
		nickname: string
		avatar: any
	}

	// 编辑后台用户角色的参数
	interface ChangeBackUserRoleProps {
		admin_user_id: any
		role_id: any
	}

	// 编辑权限的参数
	interface EditPermissonProps {
		id: any
		name: string
		description: string
	}

	// 新增/编辑角色的参数
	interface AddRoleProps {
		id?: any
		name: any
		description: string
	}

	// 添加/移除 角色的权限数据
	interface ChangeRolePermissionProps {
		permission_id: any
		role_id: any
	}
}
