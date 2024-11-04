<template>
	<n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
		<n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
			<n-grid :cols="24" :x-gap="18">
				<n-form-item-grid-item :span="12" label="用户名" path="username">
					<n-input v-model:value="formModel.username" clearable />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="密码" path="password">
					<n-input v-model:value="formModel.password" type="password" clearable />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="角色" path="role_id">
					<n-select v-model:value="formModel.role_id" label-field="name" value-field="id" :options="rolesOptions" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="昵称" path="nickname">
					<n-input v-model:value="formModel.nickname" />
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
import { genderOptions, userStatusOptions } from '@/constants'
import { formRules, createRequiredFormRule } from '@/utils'
import { fetchRolesSelect, addBackUser } from '@/api'

type ModalData = ApiManagement.AddBackUserProps

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

const rolesOptions = ref<Record<string, any>[]>([])

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
		add: '添加后台用户',
		edit: '编辑后台用户',
	}
	return titles[props.type]
})

const formRef = ref<HTMLElement & FormInst>()

type FormModel = Pick<ModalData, 'nickname' | 'username' | 'password' | 'role_id'>
// type FormModel = Pick<ModalData, 'nick_name' | 'mobile'>

const formModel = reactive<FormModel>(createDefaultFormModel())

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
	nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 4, message: '最小长度4位', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 4, message: '最小长度4位', trigger: 'blur' },
	],
	role_id: createRequiredFormRule('请选择角色'),
}

function createDefaultFormModel(): FormModel {
	return {
		nickname: '',
		username: '',
		password: '',
		role_id: '',
	}
}

function handleUpdateFormModel(model: Partial<FormModel>) {
	Object.assign(formModel, model)
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

// 获取角色下拉选项
async function getRolesSelectOptions() {
	const res = await fetchRolesSelect()
	console.log(res)
	if (res.code === 200) {
		rolesOptions.value = res.data
	}
}

// 新增后台用户
async function handleAddBackUser() {
	const res = await addBackUser(formModel)
	console.log(res)
	if (res.code === 200) {
		emit('refresh')
		window.$message?.success('新增成功!')
	} else {
		window.$message?.error('新增失败!')
	}
}

async function handleSubmit() {
	console.log(formModel)
	await formRef.value?.validate()
	if (props.type === 'add') {
		handleAddBackUser()
	}
	closeModal()
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
