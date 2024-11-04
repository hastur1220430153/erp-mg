const orderMg: AuthRoute.Route = {
  name: 'order-mg',
  path: '/order-mg',
  component: 'basic',
  meta: { title: '订单管理', icon: 'ic:baseline-person-outline', order: 1, permissions: ['orderMg'] },
  children: [
    {
      name: 'order-mg',
      path: '/order-mg',
      component: 'self',
      meta: { title: '订单列表', icon: 'ic:baseline-supervisor-account', keepAlive: true, permissions: ['orderMg'] },
    },
  ],
}

export default orderMg
