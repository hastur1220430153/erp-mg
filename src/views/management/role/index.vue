<template>
  <div>
    <n-card title="角色列表" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="space-between">
          <n-space>
            <n-button type="primary" @click="handleAddRole">创建角色</n-button>
            <!-- <n-button type="error">
              <icon-ic-round-delete class="mr-4px text-20px" />
              删除
            </n-button> -->
          </n-space>
          <n-space align="center" :size="18">
            <n-button size="small" type="primary" @click="getTableData">
              <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
              刷新表格
            </n-button>
            <column-setting v-model:columns="columns" />
          </n-space>
        </n-space>
        <n-data-table
          remote
          :columns="columns"
          :data="tableData"
          :loading="loading"
          :pagination="pagination"
          :bordered="true"
          :single-line="false"
          :scroll-x="1000"
          class="flex-1-hidden"
        />
        <role-modal v-model:visible="addVisible" :edit-data="editData" :type="roleModalType" @refresh="init" />

        <change-auth-modal v-model:visible="changeAuthVisible" :edit-data="changRoleData" @refresh="init" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { fetchPermissionsFromRole, fetchRolesList } from '@/api'
import { useBoolean, useLoading } from '@/hooks'
import type { DataTableColumns, PaginationInfo, PaginationProps } from 'naive-ui'
import { NButton, NSpace } from 'naive-ui'
import type { Ref } from 'vue'
import { onActivated, onDeactivated, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTabStore } from '~/src/store'
// import type { ModalType } from './components/table-action-modal.vue'
import type { ModalData as ChangeAuthModalProps } from './components/change-auth-modal.vue'
import ChangeAuthModal from './components/change-auth-modal.vue'
import ColumnSetting from './components/column-setting.vue'
import type { ModalData } from './components/role-modal.vue'
import RoleModal from './components/role-modal.vue'

const { loading, startLoading, endLoading } = useLoading(false)
const { bool: addVisible, setTrue: openAddModal } = useBoolean()

const { bool: changeAuthVisible, setTrue: openChangeAuthModal } = useBoolean()

// 路由器
const route = useRoute()
// 页签
const tab = useTabStore()

type TableDataProps = any

// 编辑用户 模态框需要传递的数据
const editData = ref<ModalData>({
  id: '',
  name: '',
  description: '',
})

const roleModalType = ref<'add' | 'edit'>('add')

// 编辑角色 模态框需要传递的数据
const changRoleData = ref<any>({})

// 分页
const pagination: PaginationProps = reactive({
  page: 1,
  pageCount: 0,
  pageSize: 10,
  pageSlot: 9,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100, 200],
  onChange: (page: number) => {
    pagination.page = page
    getTableData()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getTableData()
  },
  prefix: (info: PaginationInfo) => {
    return `总条数: ${info.itemCount}`
  },
})

// 表格数据
const tableData = ref<TableDataProps[]>([])
// 设置表格数据
function setTableData(data: TableDataProps[]) {
  tableData.value = data
}

// 表格列
const columns: Ref<DataTableColumns<TableDataProps>> = ref<DataTableColumns<TableDataProps>>([
  {
    key: 'id',
    title: 'ID',
    align: 'center',
    width: 40,
  },
  {
    key: 'name',
    title: '角色名称',
    align: 'center',
    width: 40,
  },
  {
    key: 'description',
    title: '角色描述',
    align: 'center',
    width: 80,
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    fixed: 'right',
    resizable: true,
    width: 140,
    minWidth: 140,
    maxWidth: 140,
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton
            onClick={() => {
              handleEditRole(row)
            }}
            type="primary"
            class="px-5"
            size={'small'}>
            编辑
          </NButton>

          <NButton
            onClick={() => {
              handleChangeRoleAuth(row)
            }}
            type="warning"
            class="px-5"
            size={'small'}>
            查看权限
          </NButton>
        </NSpace>
      )
    },
  },
]) as Ref<DataTableColumns<TableDataProps>>

// 初始化
function init() {
  getTableData()
}

// 获取表格数据
async function getTableData() {
  startLoading()
  const res = await fetchRolesList({
    page: pagination.page,
    size: pagination.pageSize,
  })
  console.log(res)
  if (res.code === 200) {
    setTableData(res.data)
    pagination!.pageCount = res.total_page
    endLoading()
    pagination.itemCount = res.total!
  } else {
    window.$message?.error('获取角色列表失败')
  }
}

// 获取角色对应的权限数据
async function getRolePermissions(id: any) {
  const res = await fetchPermissionsFromRole({ id })
  console.log(res)
  if (res.code === 200) {
    console.log('res.data', res.data)
    changRoleData.value = res.data
  } else {
    window.$message?.error('获取角色权限列表失败')
  }

  openChangeAuthModal()
}

// 新增角色
function handleAddRole() {
  roleModalType.value = 'add'
  openAddModal()
}

// 编辑角色
async function handleEditRole(row: any) {
  editData.value = {
    id: String(row.id),
    name: row.name,
    description: row.description,
  }
  roleModalType.value = 'edit'

  openAddModal()
}

// 修改角色权限
function handleChangeRoleAuth(row: any) {
  getRolePermissions(row.id)
}

// 页面进入时候(Keep-Alive)
onActivated(() => {
  if (route.query && Object.keys(route.query).length !== 0) {
    const query = JSON.parse(JSON.stringify(route.query))
    if (query?.delPath) {
      console.log('删除页面', query.delPath)
      tab.removeTab(query.delPath)
    }
    init()
  }
})

// 页面离开时候(Keep-Alive)
onDeactivated(() => {})

onMounted(() => {
  init()
})
</script>

<style scoped></style>
