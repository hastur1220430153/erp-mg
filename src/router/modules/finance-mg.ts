const financeMg: AuthRoute.Route = {
  name: 'finance-mg',
  path: '/finance-mg',
  component: 'basic',
  meta: { title: '财务管理', icon: 'ic:baseline-person-outline', order: 1, permissions: ['financeMg'] },
  children: [
    {
      name: 'finance-mg',
      path: '/finance-mg',
      component: 'self',
      meta: {
        title: '财务列表',
        icon: 'ic:baseline-supervisor-account',
        keepAlive: true,
        permissions: ['financeMg'],
      },
    },
  ],
}

export default financeMg
