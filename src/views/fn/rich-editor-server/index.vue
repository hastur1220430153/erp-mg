<template>
  <n-space :vertical="true" :size="16">
    <n-card title="富文本编辑器" :bordered="false" size="small" class="rounded-8px shadow-sm">
      <n-space :vertical="true" :size="12"> <rich-editor height="700"></rich-editor> </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { routeName } from '@/router'
import { useTabStore } from '@/store'
import { useRouterPush } from '@/composables'
import RichEditor from '@/components/mry-custom/rich-editor/index.vue'

const { routerPush } = useRouterPush()
const tabStore = useTabStore()
const title = ref('')
</script>

<style scoped></style>
