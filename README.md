## 简介

Vue3、Vite3、TypeScript、NaiveUI、Pinia、UnoCSS

**项目二次开发提炼**

### 文档地址

1. Navie UI: https://www.naiveui.com/zh-CN/light/components/button
2. icon 搜索: https://icones.js.org/
3. Admin 文档: https://admin-docs.soybeanjs.cn/guide/router.html

### 开发日志

1. 数据表格若使用 expend 类型, 需要给table添加 rowKey, 否则点击展开会展开所有列

```ts
<n-data-table
	...
  :row-key="rowKey"
/>

const rowKey = ref((row: TableDataProps) => row.id)
```

2. 自动生成的路由在 src/router/modules下, 添加了 keepAlive 的路由, 开发时, 代码更新后会有显示白屏的bug,需要手动刷新页面, 路由的参数配置: https://admin-docs.soybeanjs.cn/guide/router.html

3. 若要增删改页面文件, 先记得备份路由, 因为自动生成路由的插件有时有 bug, 自动生成路由文件的 name, title 等会全部重新变成文件名, 假如你新增了文件夹, 然后又改了他的名字, 短时间的多次修改有时会引起自动生成的 bug, 这时只需要重启开发服务器就行, 也可以关闭自动生成路由的插件, 在 **.env.development** 中将 **VITE_SOYBEAN_ROUTE_PLUGIN=Y** Y 变成 N, 即关闭自动生成路由

4. 权限: 可以使用指令 `v-permission="'Admin'"` 赋予权限, 也可以使用 hook

```ts
import { usePermission } from '@/composables'

const { hasPermission } = usePermission()

hasPermission('Admin') ? true : false
```

5. 权限使用的是 userinfo 的 roles, 若包含 Admin(大小写严格一致), 则无视任何权限限制, 拥有所有权限; 路由文件中可以定义 permission, 一个数组内定义所需要的权限(大小写严格一致), 然后在 Django 数据库中添加权限字段

6. 消息提示等可以使用, 都以 window 开头

```ts
window.$message?.error('手机号码格式错误！')
```

7. 路由跳转使用 hook

```ts
import { useRouter, useRoute } from 'vue-router'
```

也可以使用封装好的hook **useRouterPush**, 诸如去登录页首页回退等操作
具体实现在 **src/composables/router.ts**

8. icon 可以使用 https://icones.js.org/ 搜索, 项目内已经集成, 直接复制粘贴使用, 安装 **Iconify IntelliSense** 拓展, 可以直接预览 icon
