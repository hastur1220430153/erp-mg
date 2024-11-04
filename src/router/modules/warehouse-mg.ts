const warehouseMg: AuthRoute.Route = {
  name: 'warehouse-mg',
  path: '/warehouse-mg',
  component: 'basic',
  meta: { title: '仓库管理', icon: 'ic:baseline-person-outline', order: 1, permissions: ['warehouseMg'] },
  children: [
    {
      name: 'warehouse-mg',
      path: '/warehouse-mg',
      component: 'self',
      meta: {
        title: '仓库列表',
        icon: 'ic:baseline-supervisor-account',
        keepAlive: true,
        permissions: ['warehouseMg'],
      },
    },
  ],
}

export default warehouseMg
