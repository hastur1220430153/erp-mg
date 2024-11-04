const goodsMg: AuthRoute.Route = {
  name: 'goods-mg',
  path: '/goods-mg',
  component: 'basic',
  meta: { title: '商品管理', icon: 'ic:baseline-person-outline', order: 1, permissions: ['goodsMg'] },
  children: [
    {
      name: 'goods-mg',
      path: '/goods-mg',
      component: 'self',
      meta: { title: '商品列表', icon: 'ic:baseline-supervisor-account', keepAlive: true, permissions: ['goodsMg'] },
    },
  ],
}

export default goodsMg
