<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label="序号" path="user_id">
          <n-input v-model:value="formModel.user_id" disabled />
        </n-form-item-grid-item>
        <!-- <n-form-item-grid-item :span="12" label="等级" path="level">
          <n-select v-model:value="formModel.level" :options="levelOptions" />
        </n-form-item-grid-item> -->
        <!-- <n-form-item-grid-item :span="12" label-width="200px" label="封禁" path="is_partner">
          <n-switch v-model:value="formModel.is_partner" />
        </n-form-item-grid-item> -->
        <n-form-item-grid-item :span="24" label="积分数量" path="value">
          <n-input-number v-model:value="formModel.value" :precision="0" :min="1" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="理由" path="channel">
          <template #label>
            <div class="flex justify-end items-center gap-1px">
              <span>理由</span>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <icon-material-symbols:help-outline class="text-16px" />
                </template>
                <span>积分变动来源/理由</span>
              </n-tooltip>
            </div>
          </template>
          <n-input v-model:value="formModel.channel" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="操作方式" path="operation">
          <n-radio-group v-model:value="formModel.operation">
            <n-space>
              <n-radio v-for="opt in operationOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import type { FormInst, FormItemRule } from 'naive-ui'
import { api_edit_user_credits } from '@/api'

export type ModalData = ApiUser.EditUserCreditsProps

export interface Props {
  /** 弹窗可见性 */
  visible: boolean
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: 'add' | 'edit'
  /** 编辑的表格行数据 */
  editData?: ModalData | null
}

export type ModalType = NonNullable<Props['type']>

defineOptions({ name: 'TableActionModal' })

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null,
})

interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'refresh'): void
}

const emit = defineEmits<Emits>()

const modalVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})
const closeModal = () => {
  modalVisible.value = false
}

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加用户积分',
    edit: '编辑用户积分',
  }
  return titles[props.type]
})

const operationOptions = ref<
  {
    label: string
    value: ApiUser.EditUserCreditsOperation
  }[]
>([
  {
    label: '增加',
    value: 1,
  },
  {
    label: '减少',
    value: -1,
  },
])

const formRef = ref<HTMLElement & FormInst>()

type FormModel = ModalData
// type FormModel = Pick<ModalData, 'nick_name' | 'mobile'>

const formModel = reactive<FormModel>(createDefaultFormModel())

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  user_id: [
    {
      required: true,
      message: '未识别到id',
      trigger: 'blur',
    },
  ],
  value: [
    { required: true, message: '请输入积分数量', trigger: 'blur', type: 'number' },
    {
      min: 1,
      message: '值需要大于0',
      trigger: 'blur',
      type: 'number',
    },
  ],
  channel: [
    {
      required: true,
      message: '积分变动来源/理由',
      trigger: 'blur',
    },
  ],
  operation: [],
}

function createDefaultFormModel(): FormModel {
  return {
    user_id: 0,
    value: 1,
    channel: '',
    operation: 1,
  }
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model)
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel()
      handleUpdateFormModel(defaultFormModel)
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData)
      }
    },
  }

  handlers[props.type]()
}

// 编辑后台用户
async function handleEditUser() {
  const res = await api_edit_user_credits(formModel)
  console.log(res)
  if (res.code === 200) {
    emit('refresh')
    window.$message?.success('编辑成功!')
    closeModal()
  } else {
    window.$message?.error(`编辑失败, ${res.msg}`)
  }
}

async function handleSubmit() {
  console.log(formModel)
  await formRef.value?.validate()
  if (props.type === 'edit') {
    handleEditUser()
  }
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType()
    }
  },
)
</script>

<style scoped></style>
