const fnDeveloping: AuthRoute.Route = {
  name: 'fn-developing',
  path: '/fn-developing',
  component: 'basic',
  meta: { title: '开发中(dev模式可见)', icon: 'mdi:menu', hide: process.env.NODE_ENV !== 'development', order: 8888 },
  children: [
    {
      name: 'fn-developing_rich-editor-server-developing',
      path: '/fn-developing/rich-editor-server-developing',
      component: 'self',
      meta: { title: '富文本编辑器-服务器-开发中', icon: 'mdi:menu' },
    },
  ],
}

export default fnDeveloping
