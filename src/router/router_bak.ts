const userMg: AuthRoute.Route = {
  name: 'user-mg',
  path: '/user-mg',
  component: 'basic',
  meta: { title: '用户管理', icon: 'ic:baseline-person-outline', order: 1 },
  children: [
    {
      name: 'user-mg_user-list',
      path: '/user-mg/user-list',
      component: 'self',
      meta: { title: '用户列表', icon: 'ic:baseline-supervisor-account', keepAlive: true },
    },
  ],
}

export default userMg
