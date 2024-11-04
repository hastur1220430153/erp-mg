<template>
  <div>
    <n-card title="生产采购列表" :bordered="false" class="h-full rounded-8px shadow-sm">
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
interface goodsData {
  id: number
  goodsName: string
  create_time: string
  order_id: string
  balance: string
  number: number
}

const listData: goodsData[] = [
  {
    id: 1,
    goodsName: '商品1',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 2,
    goodsName: '商品2',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 3,
    goodsName: '商品3',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 4,
    goodsName: '商品4',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 5,
    goodsName: '商品5',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 6,
    goodsName: '商品6',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 7,
    goodsName: '商品7',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 8,
    goodsName: '商品8',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 9,
    goodsName: '商品9',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
  {
    id: 10,
    goodsName: '商品10',
    create_time: '2022-01-01 12:00:00',
    order_id: '1234567890',
    balance: '100',
    number: 8,
  },
]

type TableDataProps = goodsData
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
    key: 'goodsName',
    title: '商品名',
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
                    handleCopy(row.goodsName)
                  }}>
                  <NP class="ellipsis-text whitespace-pre-wrap">{row.goodsName}</NP>
                </div>
              )
            },
          }}>
          点击复制: {row.goodsName}
        </NPopover>
      )
    },
  },

  {
    key: 'balance',
    title: '单价',
    align: 'center',
    width: 40,
  },
  {
    key: 'number',
    title: '数量',
    align: 'center',
    width: 40,
  },

  {
    key: 'order_id',
    title: '订单号',
    align: 'center',
    width: 80,
  },
  {
    key: 'create_time',
    title: '下单时间',
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
