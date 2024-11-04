<template>
  <n-drawer
    v-model:show="modalVisible"
    resizable
    :min-width="500"
    :default-width="700"
    :placement="placement"
    :on-update:width="handleResize"
  >
    <n-drawer-content title="用户详情" class="w-full">
      <n-layout>
        <n-card :bordered="false" class="h-full w-full rounded-8px shadow-sm">
          <n-grid v-if="loading" :cols="cols" responsive="screen" :x-gap="16" :y-gap="16">
            <n-grid-item v-for="item in 16" :key="item">
              <n-skeleton :height="60" class="h-60px p-16px rounded-8px text-white" :sharp="false" size="medium" />
            </n-grid-item>
          </n-grid>

          <div v-if="!loading" :cols="cols" :x-gap="16" :y-gap="16">
            <n-space class="pb-12px" justify="space-between">
              <n-space>
                <div></div>
              </n-space>
              <n-space align="center" :size="18"> </n-space>
            </n-space>

            <n-grid class="text-lg" y-gap="12" x-gap="50" cols="1 600:2">
              <n-gi>
                <n-card size="medium">
                  <div>ID: {{ drawerData?.id }}</div></n-card
                >
              </n-gi>
              <n-gi>
                <n-card size="medium">
                  <div>
                    等级:
                    <n-tag size="medium" :type="levelTagType">
                      <span class="text-12px">{{ getLevelName(drawerData?.level || 'C') }}</span>
                    </n-tag>
                  </div></n-card
                >
              </n-gi>

              <n-gi>
                <n-card size="medium">
                  <h1 class="pb-1">头像:</h1>
                  <div>
                    <n-avatar :size="140" :src="drawerData?.avatar" /></div
                ></n-card>
              </n-gi>

              <n-gi
                ><n-card size="medium">
                  <div>积分: {{ drawerData?.credits }}</div></n-card
                >
              </n-gi>

              <n-gi
                ><n-card size="medium">
                  <div>昵称: {{ drawerData?.nickname }}</div></n-card
                >
              </n-gi>
              <n-gi
                ><n-card size="medium">
                  <div>昵称更新时间: {{ drawerData?.nickname_update_time || '-' }}</div></n-card
                >
              </n-gi>

              <n-gi
                ><n-card size="medium">
                  <div>
                    封禁状态:
                    <n-tag :type="drawerData?.is_banned ? 'error' : 'success'">
                      <span>{{ drawerData?.is_banned ? '封禁' : '正常用户' }}</span>
                    </n-tag>
                  </div></n-card
                >
              </n-gi>

              <n-gi
                ><n-card size="medium">
                  <div>收货人: {{ drawerData?.express_name }}</div>
                  <div>收货手机号码: {{ drawerData?.express_phone }}</div>
                  <div>所在地区: {{ drawerData?.express_area }}</div>
                  <div>详细地址: {{ drawerData?.express_address }}</div>
                </n-card>
              </n-gi>

              <n-gi
                ><n-card size="medium">
                  <div>姓名: {{ drawerData?.name }}</div>

                  <div>
                    手机号:
                    <n-popover trigger="hover">
                      <template #trigger>
                        <span class="cursor-pointer" @click="handleCopy(drawerData?.phone || '')">{{
                          drawerData?.phone
                        }}</span>
                      </template>
                      <span>点击复制: {{ drawerData?.phone }}</span>
                    </n-popover>
                  </div>
                  <div>身份证号: {{ drawerData?.id_card }}</div>
                </n-card>
              </n-gi>

              <n-gi
                ><n-card size="medium" hoverable>
                  <div>创建时间: {{ drawerData?.create_time }}</div></n-card
                >
              </n-gi>
            </n-grid>
          </div>
        </n-card>
      </n-layout>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DrawerPlacement } from 'naive-ui'
import { computed, ref, watch } from 'vue'

import { useLoading, useTableFn } from '~/src/hooks'
const { loading, startLoading, endLoading } = useLoading(false)

export type ModalData = ApiUser.UserDeatilData

export interface Props {
  /** 弹窗可见性 */
  visible: boolean

  /** 查询参数 */
  queryData?: ModalData | null
}
const { handleCopy } = useTableFn()

const placement = ref<DrawerPlacement>('right')

const props = withDefaults(defineProps<Props>(), {
  queryData: null,
})

const drawerData = ref<ModalData>()

const presetColorArr = [
  ['#ec4786', '#b955a4'],
  ['#865ec0', '#5144b4'],
  ['#56cdf3', '#719de3'],
  ['#fcbc25', '#f68057'],
]

const levelTagType = computed(() => {
  const type: Record<ApiUser.UserLevel, 'warning' | 'info' | 'default'> = {
    A: 'warning',
    B: 'info',
    C: 'default',
  }
  return type[drawerData.value?.level || 'C']
})

const getLevelName = (level: ApiUser.UserLevel) => {
  const type: Record<ApiUser.UserLevel, '寻宝神使' | '寻宝天使' | '普通用户'> = {
    A: '寻宝神使',
    B: '寻宝天使',
    C: '普通用户',
  }
  return type[level]
}

const getColor = (idx: number) => {
  return presetColorArr[idx % presetColorArr.length]
}
interface Emits {
  (e: 'update:visible', visible: boolean): void
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

const cols = ref<number>(2)

const handleResize = (width: any) => {
  // 根据drawer宽度计算cols
  if (width < 600) {
    cols.value = 1
  } else if (width < 1200) {
    cols.value = 2
  } else {
    cols.value = 4
  }
}

const closeModal = () => {
  modalVisible.value = false
}

const getStats = async () => {
  startLoading()
  if (!props.queryData) {
    window.$message?.error('获取详情失败')
    endLoading()
    return
  }
  drawerData.value = props.queryData
  endLoading()
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      getStats()
    }
  },
)
</script>

<style scoped></style>
