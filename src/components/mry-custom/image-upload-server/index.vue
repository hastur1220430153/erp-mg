<template>
  <n-upload
    :file-list="fileList"
    :max="limit"
    :accept="acceptFileType"
    list-type="image-card"
    @before-upload="beforeUpload"
    @change="handleChange"
  >
    <n-button>点击上传</n-button>
  </n-upload>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { routeName } from '@/router'
import { useTabStore } from '@/store'
import { useRouterPush } from '@/composables'
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { api_upload_file_with_server } from '~/src/api/upload'
import { nanoid } from 'nanoid'
export interface Props {
  /**  限制数量 */
  limit?: undefined | number
  limitSize?: undefined | number
  acceptFileType?: undefined | string
  echoFileList?: undefined | any[] | string
}

const { routerPush } = useRouterPush()
const tabStore = useTabStore()

const props = withDefaults(defineProps<Props>(), {
  /**  限制数量 */
  limit: undefined,
  limitSize: 10,
  acceptFileType: '.jpg,.png,.jpeg,.gif',
  echoFileList: undefined,
})
// 文件列表
const fileList = ref<any[]>([])

// url
const saveFileList = ref<any[]>([])

// 文件上传前的校验
const beforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const fileSize = data.file?.file?.size!
  const fileType = data.file?.file?.type!

  const isLessLimitSize = fileSize / 1024 / 1024 < props.limitSize
  const matchedFileType = fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif'

  if (!isLessLimitSize) {
    window?.$message?.error(`上传图片大小不能超过${props.limitSize}MB!`)
  } else if (!matchedFileType) {
    window?.$message?.error('只能上传jpg/png/gif文件!')
  }

  const result = isLessLimitSize && matchedFileType
  return result
}

const handleChange = (data: { file: UploadFileInfo; fileList: UploadFileInfo[]; event?: Event }) => {
  // 若是新增
  if (data.event) {
    handleUpload(data.file)
  } else {
    // 若是删除
    const index = fileList.value.findIndex(item => item.id === data.file.id)
    saveFileList.value.splice(index, 1)
    fileList.value.splice(index, 1)
  }
}

// 接口
const handleUpload = async (file: any) => {
  const res = await api_upload_file_with_server(file.file)
  console.log('上传结果', res)
  if (res.code === 200) {
    const newImage = {
      id: file.id,
      name: file.name,
      status: 'finished',
      url: res.data.url,
    }

    fileList.value.push(newImage)
    saveFileList.value.push(res.data.url)
  } else {
    const errorImageStatus = {
      id: file.id,
      name: file.name,
      status: 'error',
    }

    fileList.value.push(errorImageStatus)
    saveFileList.value.push('error_url')
  }
}

const getList = () => {
  return saveFileList.value
}

const echoImageList = () => {
  // 修改时图片回显
  fileList.value = []
  // 如果有回显的图片
  if (props.echoFileList) {
    // 判断是 string
    if (typeof props.echoFileList === 'string') {
      const params = {
        id: nanoid(),
        name: nanoid(),
        status: 'finished',
        url: props.echoFileList,
      }
      fileList.value.push(params)
      saveFileList.value.push(props.echoFileList)

      return
    }
    if (props.echoFileList.length > 0) {
      props.echoFileList.map(item => {
        const params = {
          id: nanoid(),
          name: nanoid(),
          status: 'finished',
          url: item,
        }
        fileList.value.push(params)
        saveFileList.value.push(item)
      })

      return
    }
  }

  saveFileList.value = []
}

onMounted(() => {
  console.log('props', { ...props })
  echoImageList()
})

watch(
  () => props.echoFileList,
  newValue => {
    if (newValue) {
      console.log('更新', newValue)
      echoImageList()
    }
  },
)

defineExpose({
  getList,
})
</script>

<style scoped></style>
