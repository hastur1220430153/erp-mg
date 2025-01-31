const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  children: [
    // {
    //   name: 'dashboard_analysis',
    //   path: '/dashboard/analysis',
    //   component: 'self',
    //   meta: {
    //     title: '分析页',
    //     requiresAuth: true,
    //     icon: 'icon-park-outline:analysis',
    //     i18nTitle: 'routes.dashboard.analysis',
    //   },
    // },
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: 'self',
      meta: {
        title: '工作台',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
        i18nTitle: 'routes.dashboard.workbench',
      },
    },
    {
      name: 'dashboard_changePwd',
      path: '/dashboard/changePwd',
      component: 'self',
      meta: { title: '更改密码', icon: 'mdi:menu', hide: true },
    },
  ],
  meta: { title: '仪表盘', icon: 'mdi:monitor-dashboard', order: 0, i18nTitle: 'routes.dashboard._value' },
}

export default dashboard
