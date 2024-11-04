const fn: AuthRoute.Route = {
  name: 'fn',
  path: '/fn',
  component: 'basic',
  meta: {
    title: '功能(dev模式可见)',
    icon: 'mdi:menu',
    order: 9999,
    hide: process.env.NODE_ENV !== 'development',
  },
  children: [
    { name: 'fn_tab', path: '/fn/tab', component: 'self', meta: { title: 'Tab标签', icon: 'mdi:menu' } },
    {
      name: 'fn_image-upload-server',
      path: '/fn/image-upload-server',
      component: 'self',
      meta: { title: '图片上传-服务器', icon: 'mdi:menu' },
      children: [],
    },
    {
      name: 'fn_file-upload-server',
      path: '/fn/file-upload-server',
      component: 'self',
      meta: { title: '文件上传-服务器', icon: 'mdi:menu' },
    },
    {
      name: 'fn_rich-editor-server',
      path: '/fn/rich-editor-server',
      component: 'self',
      meta: { title: '富文本编辑器-服务器', icon: 'mdi:menu' },
    },
    {
      name: 'fn_tab-detail',
      path: '/fn/tab-detail',
      component: 'self',
      meta: { title: 'fn_tab-detail', icon: 'mdi:menu', hide: true },
    },
    {
      name: 'fn_tab-multi-detail',
      path: '/fn/tab-multi-detail',
      component: 'self',
      meta: { title: 'fn_tab-multi-detail', icon: 'mdi:menu', hide: true },
    },
    {
      name: 'fn_websocket',
      path: '/fn/websocket',
      component: 'self',
      meta: { title: 'fn_websocket', icon: 'mdi:menu', hide: true },
    },
  ],
}

export default fn
