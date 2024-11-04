<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <!-- <icon-local-avatar href="" class="text-32px" /> -->
      <n-avatar round size="medium" :src="auth.userInfo.avatar" />
      <span class="pl-8px text-16px font-medium">{{ auth.userInfo.nickname }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'
import { useAuthStore, useThemeStore } from '@/store'
import { useIconRender, useRouterPush } from '@/composables'
// import { router } from '~/src/router'

defineOptions({ name: 'UserAvatar' })

const auth = useAuthStore()
const theme = useThemeStore()
const { iconRender } = useIconRender()
const { routerPush } = useRouterPush(false)
const options: DropdownOption[] = [
  {
    label: '用户中心',
    key: 'user-center',
    icon: iconRender({ icon: 'carbon:user-avatar' }),
  },
  {
    label: '更改密码',
    key: 'changePwd',
    icon: iconRender({ icon: 'material-symbols:lock-reset' }),
  },
  {
    label: '刷新信息',
    key: 'updateUserInfo',
    icon: iconRender({ icon: 'carbon:reset' }),
  },
  {
    type: 'divider',
    key: 'divider',
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconRender({ icon: 'carbon:logout' }),
  },
]

type DropdownKey = 'user-center' | 'logout' | 'changePwd' | 'updateUserInfo'

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey
  switch (key) {
    case 'logout':
      window.$dialog?.info({
        title: '提示',
        content: '您确定要退出登录吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          auth.resetAuthStore()
        },
      })
      break

    case 'user-center':
      routerPush({
        name: 'dashboard_workbench',
      })
      break

    case 'changePwd':
      routerPush({
        name: 'dashboard_changePwd',
      })
      break
    case 'updateUserInfo':
      console.log('你好')
      auth.updateUserInfo()
      break

    default:
      break
  }
}
</script>

<style scoped></style>
