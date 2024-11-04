<template>
  <div>
    <n-card title="权限列表" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="space-between">
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
        <edit-permission-modal v-model:visible="editVisible" :edit-data="editData" type="edit" @refresh="init" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { fetchBackUserDetail, fetchPermissionList } from '@/api'
import { useBoolean, useLoading } from '@/hooks'
import type { DataTableColumns, PaginationInfo, PaginationProps } from 'naive-ui'
import { NButton, NSpace } from 'naive-ui'
import type { Ref } from 'vue'
import { onActivated, onDeactivated, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTabStore } from '~/src/store'
import ColumnSetting from './components/column-setting.vue'
import type { ModalData } from './components/edit-permission-modal.vue'
import EditPermissionModal from './components/edit-permission-modal.vue'

const { loading, startLoading, endLoading } = useLoading(false)
const { bool: addVisible, setTrue: openAddModal } = useBoolean()
const { bool: editVisible, setTrue: openEditModal } = useBoolean()
const { bool: changeRoleVisible, setTrue: openChangeRoleModal } = useBoolean()

// 路由器
const route = useRoute()
// 页签
const tab = useTabStore()

type TableDataProps = any

// 编辑权限 模态框需要传递的数据
const editData = ref<ModalData>({
  id: '',
  name: '',
  description: '',
})

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
    key: 'key',
    title: 'Key',
    align: 'center',
    width: 50,
  },
  {
    key: 'name',
    title: '权限名称',
    align: 'center',
    width: 50,
  },
  {
    key: 'description',
    title: '权限描述',
    align: 'center',
    width: 80,
  },

  {
    key: 'actions',
    title: '操作',
    align: 'center',
    fixed: 'right',
    resizable: true,
    width: 40,
    minWidth: 40,
    maxWidth: 60,
    render: row => {
      return (
        <NSpace justify={'center'}>
          {/* <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            编辑
          </NButton> */}

          <NButton
            onClick={() => {
              handleEditBackUser(row)
            }}
            class="px-5"
            size={'small'}>
            编辑
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
  const res = await fetchPermissionList({
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
    window.$message?.error('获取权限列表失败')
  }
}

// 编辑权限
async function handleEditBackUser(row: any) {
  editData.value = {
    id: String(row.id),
    name: row.name,
    description: row.description,
  }
  openEditModal()
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
