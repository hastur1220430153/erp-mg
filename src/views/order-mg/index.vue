<template>
  <div>
    <n-card title="订单列表" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <!-- 筛选区 -->
        <!-- <n-space class="pb-12px w-full">
          <n-input
            v-model:value="listQuery.phone"
            style="width: 260px"
            placeholder="查询手机号"
            clearable
            @keyup.enter="filterSearch"
            @change="filterSearch"
          />
          <n-input
            v-model:value="listQuery.parent_phone"
            style="width: 260px"
            placeholder="查询邀请人手机号"
            clearable
            @keyup.enter="filterSearch"
          /> 

          <n-button type="primary" @click="filterSearch">搜索</n-button>
        </n-space> -->

        <n-space class="pb-12px" justify="space-between">
          <n-space>
            <!-- <n-button type="success" @click="exportExcel">
              <icon-uil:export class="mr-4px text-20px" />
              导出Excel
            </n-button> -->
            <!-- <n-button type="warning" @click="airdropCard">
              <p class="mr-4px text-20px" />
              空投卡牌
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
          :scroll-x="1100"
          class="flex-1-hidden"
        />

        <info-drawer v-model:visible="infoDrawerVisible" :query-data="drawerQueryData" />

        <!-- <airdrop-gems-drawer v-model:visible="airdropGemsDrawerVisible" :query-data="airdropGemsdrawerQueryData" />

        <airdrop-card-drawer v-model:visible="airdropCardDrawerVisible" :query-data="airdropCarddrawerQueryData" /> -->

        <!-- <table-action-modal
          v-model:visible="visible"
          :type="modalType"
          :edit-data="editData"
        /> -->
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { api_get_user_detail, api_get_user_list, api_user_list_export_excel, api_user_list_manage } from '@/api'
import { useBoolean, useLoading, useTableFn } from '@/hooks'
import type { DataTableColumns, PaginationInfo, PaginationProps } from 'naive-ui'
import { NButton, NP, NPopover, NSpace } from 'naive-ui'
import type { Ref } from 'vue'
import { onActivated, onDeactivated, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTabStore } from '~/src/store'
const { loading, startLoading, endLoading } = useLoading(false)
const { bool: editVisible, setTrue: openEditModal } = useBoolean()
const { bool: infoDrawerVisible, setTrue: openInfoDrawer } = useBoolean()

const { handleCopy, handleExportExcel } = useTableFn()

const route = useRoute()
const tab = useTabStore()
interface orderData {
  id: number
  username: string
  create_time: string
  order_id: string
  balance: string

  update_time: string
}

const listData: orderData[] = [
  {
    id: 1,
    username: '13812345678',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 2,
    username: '13812345679',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 3,
    username: '138123456710',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 4,
    username: '138123456711',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 5,
    username: '138123456712',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 6,
    username: '138123456713',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 7,
    username: '138123456714',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 8,
    username: '138123456715',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 9,
    username: '138123456716',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 10,
    username: '138123456717',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 11,
    username: '138123456718',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 12,
    username: '138123456719',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 13,
    username: '138123456720',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 14,
    username: '138123456721',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 15,
    username: '138123456722',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 16,
    username: '138123456723',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 17,
    username: '138123456724',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 18,
    username: '138123456725',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 19,
    username: '138123456726',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
  {
    id: 20,
    username: '138123456727',
    create_time: '2022-01-01 12:00:00',
    balance: '10000',
    update_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
  },
]

type TableDataProps = orderData
type listQueryProps = ApiUser.UserListProps

const pagination: PaginationProps = reactive({
  page: 1,
  pageCount: 0,
  pageSize: 20,
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

const tableData = ref<TableDataProps[]>([])
function setTableData(data: TableDataProps[]) {
  tableData.value = data
}

const listQuery = ref<listQueryProps>({
  page: pagination.page,
  size: pagination.size,
  phone: null,
})

const columns: Ref<DataTableColumns<TableDataProps>> = ref<DataTableColumns<TableDataProps>>([
  {
    key: 'id',
    title: 'ID',
    align: 'center',
    width: 30,
  },

  {
    key: 'username',
    title: '订单号',
    align: 'center',
    resizable: true,
    maxWidth: 300,
    minWidth: 80,
    width: 80,
    render: row => {
      return (
        <NPopover
          trigger="hover"
          v-slots={{
            trigger: () => {
              return (
                <div
                  class="px-4 cursor-pointer"
                  onClick={() => {
                    handleCopy(row.username)
                  }}>
                  <NP class="ellipsis-text whitespace-pre-wrap">{row.username}</NP>
                </div>
              )
            },
          }}>
          点击复制: {row.username}
        </NPopover>
      )
    },
  },

  {
    key: 'create_time',
    title: '订单创建时间',
    align: 'center',
    width: 80,
  },
  {
    key: 'update_time',
    title: '订单完成时间',
    align: 'center',
    width: 80,
  },

  // {
  //   key: 'is_banned',
  //   title: '封禁状态',
  //   align: 'center',
  //   width: 120,
  //   render: row => {
  //     return (
  //       <n-switch
  //         v-model:value={row.is_banned}
  //         onUpdate:value={(status: boolean) => {
  //           handleStatusChange(row.id, row.is_banned)
  //         }}
  //       />
  //     )
  //   },
  // },
])

const drawerQueryData = ref<ApiUser.UserDeatilData>({
  id: '',
  level: 'C',
  create_time: '',
  phone: '',
  avatar: '',
  credits: 0,
  nickname: '',
  nickname_update_time: '',
  is_banned: false,
  express_name: '',
  express_phone: '',
  express_area: '',
  express_address: '',
  name: '',
  id_card: '',
})

function filterSearch() {
  pagination.page = 1
  getTableData()
}

function init() {
  getTableData()
}

function formatListQuery(data: listQueryProps) {
  const listQueryFormattedNull: any = { ...data }

  Object.keys(listQueryFormattedNull).forEach(key => {
    if (listQueryFormattedNull[key] === '') {
      listQueryFormattedNull[key] = null
    }
  })
  return { ...listQueryFormattedNull, page: pagination.page, size: pagination.pageSize }
}

async function exportExcel() {
  const listQueryFormattedNull: listQueryProps = formatListQuery(listQuery.value)
  const res = await api_user_list_export_excel(listQueryFormattedNull)
  handleExportExcel(res)
}

async function getTableData() {
  // startLoading()

  const listQueryFormattedNull: any = formatListQuery(listQuery.value)

  // const res = await api_get_user_list(listQueryFormattedNull)
  // console.log(res)
  // if (res.code === 200) {
  setTableData(listData)
  //   pagination.pageCount = res.total_page
  //   endLoading()
  //   pagination.itemCount = res.total!
  // } else {
  //   window.$message?.error('获取用户列表失败')
  // }
}

async function handleOpenInfoDrawerEvent(id: Pick<TableDataProps, 'id'>) {
  const res = await api_get_user_detail({ id })

  if (res.code === 200) {
    drawerQueryData.value = res.data
    openInfoDrawer()
  } else {
    window.$message?.error('获取数据失败')
  }
}

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

onDeactivated(() => {})

onMounted(() => {
  init()
})
// 初始化
</script>

<style scoped></style>
