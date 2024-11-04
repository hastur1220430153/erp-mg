<template>
  <n-drawer
    v-model:show="drawerVisible"
    resizable
    :min-width="500"
    :default-width="800"
    :placement="placement"
    :on-update:width="handleResize"
  >
    <n-drawer-content title="空投宝石" class="w-full">
      <n-layout>
        <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
          <n-grid cols="1" :x-gap="18">
            <n-form-item-grid-item :span="24" label="手机号" path="user_phones">
              <n-input
                v-model:value="formModel.user_phones"
                :autosize="{
                  minRows: 8,
                }"
                type="textarea"
                placeholder="格式如下:
手机号(无逗号)
手机号
13888888888
13999999999
"
              />
            </n-form-item-grid-item>

            <n-form-item-grid-item :span="24" label="宝石数量" path="gems_num">
              <n-input v-model:value="formModel.gems_num" />
            </n-form-item-grid-item>
          </n-grid>
          <n-space class="w-full pt-16px" :size="24" justify="center">
            <n-button class="w-72px" @click="closeDrawer">取消</n-button>
            <n-button class="w-72px" type="success" @click="confirm">空投</n-button>
          </n-space>
        </n-form>
      </n-layout>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DrawerPlacement, FormInst, FormItemRule } from 'naive-ui'
import { computed, reactive, ref, watch } from 'vue'
import { api_add_user_message, api_airdrop_gems } from '@/api'
import richEditor from '@/components/mry-custom/rich-editor/index.vue'

import { useLoading, useTableFn } from '~/src/hooks'
import { init } from 'echarts'
const { loading, startLoading, endLoading } = useLoading(false)

export type FormModel = ApiUser.AirDropGems

export interface Props {
  /** 弹窗可见性 */
  visible: boolean

  /** 查询参数 */
  queryData?: FormModel | null
}

const placement = ref<DrawerPlacement>('right')

const props = withDefaults(defineProps<Props>(), {
  queryData: null,
})

const formRef = ref<HTMLElement & FormInst>()

const formModel = ref<FormModel>({
  user_phones: '',
  gems_num: '',
})

const clearFormModel = () => {
  formModel.value = {
    user_phones: '',
    gems_num: '',
  }
}

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  user_phones: [
    {
      required: true,
      message: '请输入用户手机号',
      trigger: 'blur',
    },
  ],
  gems_num: [
    {
      required: true,
      message: '宝石数量',
      trigger: 'blur',
    },
  ],
}

interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'refresh'): void
}

const emit = defineEmits<Emits>()

const drawerVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

const cols = ref<number>(2)

const confirm = async () => {
  console.log({ ...formModel.value })

  formRef.value?.validate(async err => {
    if (err) {
      window.$message?.warning('请检查表单项是否填写完整')
      return
    }

    const res = await api_airdrop_gems(formModel.value)
    console.log(res)
    if (res.code === 200) {
      window.$message?.success('空投成功')
      emit('refresh')
      clearFormModel()
      closeDrawer()
    } else {
      window.$message?.error(`空投失败: ${res.msg}`)
    }
  })
}
const handleResize = (width: any) => {
  // 根据drawer宽度计算cols
  if (width < 600) {
    cols.value = 1
  } else if (width < 1200) {
    cols.value = 2
  } else {
    cols.value = 4
  }
}

const closeDrawer = () => {
  drawerVisible.value = false
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      console.log('新建表单')
    }
  },
)
</script>

<style scoped></style>
