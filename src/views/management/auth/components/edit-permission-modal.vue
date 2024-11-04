<template>
	<n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
		<n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
			<n-grid :cols="24" :x-gap="18">
				<n-form-item-grid-item :span="24" label="序号" path="id">
					<n-input v-model:value="formModel.id" disabled />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="24" label="昵称" path="name">
					<n-input v-model:value="formModel.name" clearable />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="24" label="介绍" path="description">
					<n-input v-model:value="formModel.description" clearable />
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
import { editPermission } from '@/api'
import type { FormInst, FormItemRule } from 'naive-ui'
import { computed, reactive, ref, watch } from 'vue'

export type ModalData = ApiManagement.EditPermissonProps

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
		add: '添加权限',
		edit: '编辑权限',
	}
	return titles[props.type]
})

const formRef = ref<HTMLElement & FormInst>()

type FormModel = Pick<ModalData, 'id' | 'name' | 'description'>
// type FormModel = Pick<ModalData, 'nick_name' | 'mobile'>

const formModel = reactive<FormModel>(createDefaultFormModel())

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
	id: [],
	name: { required: true, message: '请输入权限名称', trigger: 'blur' },
	description: [],
}

function createDefaultFormModel(): FormModel {
	return {
		id: '',
		name: '',
		description: '',
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

// 编辑权限
async function handleEditPermission() {
	const res = await editPermission(formModel)
	console.log(res)
	if (res.code === 200) {
		emit('refresh')
		window.$message?.success('编辑成功!')
	} else {
		window.$message?.error('编辑失败!')
	}
}

async function handleSubmit() {
	console.log(formModel)
	await formRef.value?.validate()
	if (props.type === 'edit') {
		handleEditPermission()
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
