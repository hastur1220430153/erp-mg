const management: AuthRoute.Route = {
  name: 'management',
  path: '/management',
  component: 'basic',
  children: [
    {
      name: 'management_user',
      path: '/management/user',
      component: 'self',
      meta: { title: '用户管理(后台用户)', icon: 'ic:baseline-personal-injury', permissions: ['Admin'] },
    },

    {
      name: 'management_role',
      path: '/management/role',
      component: 'self',
      meta: { title: '角色管理', icon: 'carbon:user-role', permissions: ['Admin'] },
    },
    {
      name: 'management_auth',
      path: '/management/auth',
      component: 'self',
      meta: { title: '权限管理', icon: 'ic:baseline-security', permissions: ['Admin'] },
    },
  ],
  meta: {
    title: '系统管理',
    i18nTitle: 'routes.management._value',
    icon: 'carbon:cloud-service-management',
    order: 999,
    permissions: ['Admin'],
  },
}

export default management
