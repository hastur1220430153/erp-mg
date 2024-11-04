<template>
  <n-space :vertical="true" :size="16">
    <n-card title="图片上传" :bordered="false" size="small" class="rounded-8px shadow-sm">
      <n-space :vertical="true" :size="12">
        <image-upload-server ref="imageRef" :limit="limit" :echo-file-list="echoFileList"></image-upload-server>
      </n-space>
    </n-card>
    <n-card title="限制数量" :bordered="false" size="small" class="rounded-8px shadow-sm">
      <n-space :vertical="true" :size="12">
        <n-input-number v-model:value="limit" min="0" class="w-20%"></n-input-number>
      </n-space>
    </n-card>

    <n-card
      v-if="fileGetted && fileGetted.length > 0"
      title="回显的列表"
      :bordered="false"
      size="small"
      class="rounded-8px shadow-sm"
    >
      <n-space :vertical="true" :size="12">
        <n-p v-for="(i, index) in fileGetted" :key="index">{{ i }}</n-p>
      </n-space>
    </n-card>
    <n-button @click="getUrl"> 获取 url (父组件的按钮) </n-button>
  </n-space>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import imageUploadServer from '@/components/mry-custom/image-upload-server/index.vue'
const imageRef = ref<InstanceType<typeof imageUploadServer>>()

const echoFileList: any[] = []

const fileGetted = ref<any>(null)

const limit = ref<any>(1)

const getUrl = () => {
  console.log('获取')
  const urlList = imageRef.value?.getList()
  console.log(urlList)
  fileGetted.value = urlList
}
</script>

<style scoped></style>
