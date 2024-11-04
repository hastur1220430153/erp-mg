<template>
  <div>
    <n-card title="后台用户列表" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="space-between">
          <n-space>
            <n-button v-permission="'Admin'" type="primary" @click="handleAddBackUser">创建用户</n-button>
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
        <add-back-user-modal v-model:visible="addVisible" type="add" @refresh="init" />
        <edit-back-user-modal v-model:visible="editVisible" :edit-data="editData" type="edit" @refresh="init" />
        <change-role-modal v-model:visible="changeRoleVisible" :edit-data="changRoleData" type="edit" @refresh="init" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import {
api_reset_back_user_pwd_to_username,
fetchBackUserDetail,
fetchBackUserList
} from '@/api'
import { useBoolean, useLoading } from '@/hooks'
import type { DataTableColumns, PaginationInfo, PaginationProps } from 'naive-ui'
import { NButton, NSpace, useDialog } from 'naive-ui'
import type { Ref } from 'vue'
import { onActivated, onDeactivated, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTabStore } from '~/src/store'
// import type { ModalType } from './components/table-action-modal.vue'
import { usePermission } from '@/composables'
import AddBackUserModal from './components/add-back-user-modal.vue'
import type { ModalData as ChangeRoleModalProps } from './components/change-role-modal.vue'
import ChangeRoleModal from './components/change-role-modal.vue'
import ColumnSetting from './components/column-setting.vue'
import EditBackUserModal from './components/edit-back-user-modal.vue'

const { loading, startLoading, endLoading } = useLoading(false)
const { bool: addVisible, setTrue: openAddModal } = useBoolean()
const { bool: editVisible, setTrue: openEditModal } = useBoolean()
const { bool: changeRoleVisible, setTrue: openChangeRoleModal } = useBoolean()
const { hasPermission } = usePermission()

const dialog = useDialog()
// 路由器
const route = useRoute()
// 页签
const tab = useTabStore()

type TableDataProps = any

// 编辑用户 模态框需要传递的数据
const editData = ref<any>(null)

// 编辑用户角色 模态框需要传递的数据
const changRoleData = ref<ChangeRoleModalProps>({
  admin_user_id: '',
  role_id: '',
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
    key: 'username',
    title: '用户名',
    align: 'center',
    width: 100,
  },
  {
    key: 'role_name',
    title: '角色',
    align: 'center',
    width: 100,
    render: row => {
      return (
        <>
          {hasPermission('Admin') ? (
            <n-tag
              type="success"
              size="large"
              class={'cursor-pointer'}
              onClick={() => {
                handleChangeRole(row)
              }}>
              {row.role_name}
              <icon-ic-round-drive-file-rename-outline></icon-ic-round-drive-file-rename-outline>
            </n-tag>
          ) : (
            <n-tag type="success" size="large" class={''}>
              {row.role_name}
            </n-tag>
          )}
        </>
      )
    },
  },
  {
    key: 'nickname',
    title: '用户昵称',
    align: 'center',
    width: 100,
  },
  {
    key: 'summary',
    title: '简介',
    align: 'center',
    width: 150,
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
            type="primary"
            onClick={() => {
              handleEditBackUser(row)
            }}
            class="px-5"
            size={'small'}>
            编辑
          </NButton>

          <NButton v-permission="'Admin'" type="warning" size={'small'} onClick={() => resetPassword(row.username)}>
            重置密码
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
  const res = await fetchBackUserList({
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
    window.$message?.error('获取后台用户列表失败')
  }
}

// 新增后台用户
function handleAddBackUser() {
  openAddModal()
}

// 编辑后台用户
async function handleEditBackUser(row: any) {
  const res = await fetchBackUserDetail({
    id: row.id,
  })
  console.log(res)
  if (res.code === 200) {
    editData.value = {
      ...res.data,
      id: String(res.data.id),
    }
  } else {
    window.$message?.error('获取后台用户详情失败')
  }
  openEditModal()
}

// 修改用户角色
function handleChangeRole(row: any) {
  changRoleData.value = {
    // 组件需要接收字符串, 否则 warning 所以格式化一下
    admin_user_id: String(row.id),
    role_id: row.role_id,
  }
  openChangeRoleModal()
}

// 重置密码为用户名
function resetPassword(username: string) {
  dialog.warning({
    title: '警告',
    content: '此操作将重置后台用户密码为"用户名", 是否继续?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const res = await api_reset_back_user_pwd_to_username({ username })
      if (res.code === 200) {
        window.$message?.success(`修改成功`)
      } else {
        window.$message?.error(`修改失败:${res.msg}`)
      }
    },
    onNegativeClick: () => {
      window.$message?.error('取消操作')
    },
  })
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
