const productionProcurementMg: AuthRoute.Route = {
  name: 'productionProcurement',
  path: '/productionProcurement',
  component: 'basic',
  meta: {
    title: '生产采购',
    icon: 'ic:baseline-person-outline',
    order: 1,
    permissions: ['productionProcurementMg'],
  },
  children: [
    {
      name: 'productionProcurement',
      path: '/productionProcurement',
      component: 'self',
      meta: {
        title: '生产采购列表',
        icon: 'ic:baseline-supervisor-account',
        keepAlive: true,
        permissions: ['productionProcurementMg'],
      },
    },
  ],
}

export default productionProcurementMg
