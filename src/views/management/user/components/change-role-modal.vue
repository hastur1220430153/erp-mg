<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label="序号" path="id">
          <n-input v-model:value="formModel.admin_user_id" disabled />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="角色" path="role_id">
          <n-select v-model:value="formModel.role_id" label-field="name" value-field="id" :options="rolesOptions" />
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
import { changeBackUserRole, editBackUser, fetchRolesSelect } from '@/api'
import type { FormInst, FormItemRule } from 'naive-ui'
import { computed, reactive, ref, watch } from 'vue'

// 主要的类型
export type ModalData = ApiManagement.ChangeBackUserRoleProps

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

const rolesOptions = ref<Record<string, any>[]>([])

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
    add: '添加后台用户',
    edit: '编辑后台用户角色',
  }
  return titles[props.type]
})

const formRef = ref<HTMLElement & FormInst>()

type FormModel = Pick<ModalData, 'admin_user_id' | 'role_id'>
// type FormModel = Pick<ModalData, 'nick_name' | 'mobile'>

// 创建默认表单数据
const formModel = reactive<FormModel>(createDefaultFormModel())

// 创建默认表单数据
const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  admin_user_id: [],
  role_id: [],
}

// 创建默认表单数据的函数
function createDefaultFormModel(): FormModel {
  return {
    admin_user_id: '',
    role_id: '',
  }
}

// 更新表单数据
function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model)
}

// 编辑后台用户角色
async function handleChangeBackUserRole() {
  const res = await changeBackUserRole(formModel)
  console.log(res)
  if (res.code === 200) {
    emit('refresh')
    window.$message?.success('编辑成功!')
  } else {
    window.$message?.error('编辑失败!')
  }
}

// 提交
async function handleSubmit() {
  await formRef.value?.validate()
  if (props.type === 'edit') {
    handleChangeBackUserRole()
  }
  closeModal()
}

// 获取角色下拉选项
async function getRolesSelectOptions() {
  const res = await fetchRolesSelect()
  console.log(res)
  if (res.code === 200) {
    rolesOptions.value = res.data
  }
}

function handleUpdateFormModelByModalType() {
  getRolesSelectOptions()
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
