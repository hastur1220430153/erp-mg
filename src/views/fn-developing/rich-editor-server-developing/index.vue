<template>
  <n-space :vertical="true" :size="16">
    <n-card title="富文本编辑器" :bordered="false" size="small" class="rounded-8px shadow-sm">
      <n-space :vertical="true" :size="12"> <rich-editor height="700"></rich-editor> </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import RichEditor from '@/components/mry-custom/rich-editor-developing/index.vue'
import { useRouterPush } from '@/composables'
import { useTabStore } from '@/store'
import { ref } from 'vue'

const { routerPush } = useRouterPush()
const tabStore = useTabStore()
const title = ref('')
</script>

<style scoped></style>
