<template>
	<n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
		<n-transfer ref="transfer" v-model:value="currentAuth" :options="authOptions" :on-update:value="permissionChange" />
	</n-modal>
</template>

<script setup lang="ts">
import { addPermissionsOfRole, fetchPermissionList, removePermissionsOfRole } from '@/api'
import { computed, reactive, ref, watch } from 'vue'
import _ from 'lodash'
import { useDebounceFn } from '@vueuse/core'

const addSuccessFn = useDebounceFn(() => {
	window.$message?.success('新增成功')
})

const addFailFn = useDebounceFn(() => {
	window.$message?.success('新增失败')
})

const removeSuccessFn = useDebounceFn(() => {
	window.$message?.success('删除成功')
})

const removeFailFn = useDebounceFn(() => {
	window.$message?.success('删除失败')
})

// 主要的类型
export type ModalData = {
	permissions: {
		id: any
		key: string
		name: string
		description: string
	}[]
	role: {
		id: any
		name: string
	}
}

export interface Props {
	/** 弹窗可见性 */
	visible: boolean

	/** 编辑的表格行数据 */
	editData?: ModalData | null
}

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

const title = '编辑角色权限'

// 所有的权限
const authOptions = ref([])
// 当前选中的权限
const currentAuth = ref<any>()
// 角色id
const currentRoleId = ref('')
// 角色详情
const roleDetail = reactive<ModalData>({
	permissions: [],
	role: {
		id: '',
		name: '',
	},
})
const preArr = ref<any>([])

// 获取所有权限数据
async function getAllPermission() {
	const res = await fetchPermissionList({
		page: 1,
		size: 999,
	})
	if (res.code === 200) {
		const filterArr = res.data.map((item: any) => {
			return {
				label: item.name,
				value: item.id,
			}
		})

		console.log('filterArr', filterArr)

		authOptions.value = filterArr
	} else {
		window.$message?.error('获取权限列表失败')
	}
}

async function addRolePermission(permission_id: any) {
	const res = await addPermissionsOfRole({
		role_id: currentRoleId.value,
		permission_id,
	})
	console.log('新增角色权限', res)
	if (res.code === 200) {
		addSuccessFn()
	} else {
		addFailFn()
	}
}
async function removeRolePermission(permission_id: any) {
	const res = await removePermissionsOfRole({
		role_id: currentRoleId.value,
		permission_id,
	})
	console.log('删除角色权限', res)
	if (res.code === 200) {
		removeSuccessFn()
	} else {
		removeFailFn()
	}
}

async function permissionChange(params: any) {
	currentAuth.value = params

	const addArr = _.difference(params, preArr.value)
	const delArr = _.difference(preArr.value, params)

	if (addArr.length > 0) {
		addArr.forEach((item: any) => {
			addRolePermission(item)
		})
	}
	if (delArr.length > 0) {
		delArr.forEach((item: any) => {
			removeRolePermission(item)
		})
	}

	preArr.value = params
}

watch(
	() => props.visible,
	newValue => {
		if (newValue) {
			getAllPermission()
			Object.assign(roleDetail, props.editData)

			currentRoleId.value = roleDetail.role.id

			const currentHasAuthId = roleDetail?.permissions.map((item: any, index) => {
				return item.id
			})

			currentAuth.value = currentHasAuthId

			preArr.value = currentHasAuthId
			console.log('preArr', preArr.value)
		}
	},
)
</script>

<style scoped></style>
