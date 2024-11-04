<template>
  <n-card :bordered="false" class="h-full rounded-8px shadow-sm">
    <n-grid v-if="loading" cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <n-grid-item v-for="item in 24" :key="item">
        <n-skeleton :height="100" class="h-100px p-16px rounded-8px text-white" :sharp="false" size="medium" />
      </n-grid-item>
    </n-grid>

    <n-grid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <n-grid-item v-for="(item, index) in dashBoardData" :key="item.title">
        <gradient-bg class="h-100px" :start-color="getColor(index)[0]" :end-color="getColor(index)[1]">
          <!-- <gradient-bg class="h-100px" :start-color="getColor(index)[0]" :end-color="getColor(index)[1]"> -->
          <h3 class="text-16px">{{ item.title }}</h3>
          <div class="flex justify-between pt-12px">
            <svg-icon :icon="getIcon(index)" class="text-32px" />
            <!-- <count-to :start-value="0" :end-value="item.value" class="text-30px text-white dark:text-dark" /> -->
            <p class="text-20px text-white dark:text-dark">{{ item.value }}</p>
          </div>
        </gradient-bg>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { fetchDashBoard } from '~/src/api'
import { GradientBg } from './components'
import { ref, onMounted } from 'vue'
import { useLoading } from '~/src/hooks'
const { loading, startLoading, endLoading } = useLoading(false)

defineOptions({ name: 'DashboardAnalysisDataCard' })

interface CardData {
  title: string
  value: number
}

const dashBoardData = ref<CardData[]>([])

const presetColorArr = [
  ['#ec4786', '#b955a4'],
  ['#865ec0', '#5144b4'],
  ['#56cdf3', '#719de3'],
  ['#fcbc25', '#f68057'],
]

const presetIconArr = [
  'ant-design:bar-chart-outlined',
  'ant-design:money-collect-outlined',
  'carbon:document-download',
  'ant-design:trademark-circle-outlined',
]

const getColor = (idx: number) => {
  return presetColorArr[idx % presetColorArr.length]
}
const getIcon = (idx: number) => {
  return presetIconArr[idx % presetIconArr.length]
}

const init = async () => {
  startLoading()
  const res = await fetchDashBoard()
  if (res.code === 200) {
    dashBoardData.value = res.data
  } else {
    window.$message?.error('获取数据统计失败')
  }
  endLoading()
}

onMounted(() => {
  init()
})
</script>

<style scoped></style>
