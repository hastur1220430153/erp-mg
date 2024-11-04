<template>
  <n-space
    :vertical="true"
    justify="center"
    align="center"
    class="w-full h-screen flex items-center justify-center"
    :size="16"
  >
    <n-h2>修改密码</n-h2>
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label-width="100" label="旧密码" path="old_password">
          <n-input
            v-model:value="formModel.old_password"
            type="password"
            show-password-on="click"
            placeholder="请输入旧密码"
            clearable
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label-width="100" label="新密码" path="new_password">
          <n-input
            v-model:value="formModel.new_password"
            placeholder="请输入新密码"
            type="password"
            show-password-on="click"
            clearable
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item label-width="100" :span="24" label="重复新密码" path="re_new_password">
          <n-input
            v-model:value="formModel.re_new_password"
            placeholder="请重复新密码"
            type="password"
            show-password-on="click"
            clearable
          />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button type="primary" @click="handleSubmit">确认修改</n-button>
      </n-space>
    </n-form>
  </n-space>
</template>

<script lang="ts" setup>
import type { FormInst, FormItemRule } from 'naive-ui'
import { ref, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { api_reset_password } from '~/src/api'
import { getConfirmPwdRule } from '~/src/utils'
import { useTabStore } from '~/src/store'

const route = useRoute()
const tab = useTabStore()

const formRef = ref<HTMLElement & FormInst>()

type FormModel = {
  old_password: string
  new_password: string
  re_new_password: string
}

const formModel = reactive<FormModel>(createDefaultFormModel())

function createDefaultFormModel(): FormModel {
  return {
    old_password: '',
    new_password: '',
    re_new_password: '',
  }
}

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  old_password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  new_password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 4, message: '最小长度4位', trigger: 'blur' },
  ],
  re_new_password: getConfirmPwdRule(toRefs(formModel).new_password),
}

async function handleSubmit() {
  await formRef.value?.validate()
  handleReset()
}
async function handleReset() {
  const res = await api_reset_password({
    old_password: formModel.old_password,
    new_password: formModel.new_password,
  })
  if (res.code === 200) {
    window.$message?.success(`更改成功`)
    tab.removeTab(route.fullPath)
  } else {
    window.$message?.error(`更改失败: ${res.msg}`)
  }
}
</script>

<style scoped></style>
