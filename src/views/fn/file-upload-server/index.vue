<template>
	<n-space :vertical="true" :size="16">
		<n-card title="文件上传" :bordered="false" size="small" class="rounded-8px shadow-sm">
			<n-space :vertical="true" :size="12"> </n-space>
		</n-card>
	</n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { routeName } from '@/router'
import { useTabStore } from '@/store'
import { useRouterPush } from '@/composables'

const { routerPush } = useRouterPush()
const tabStore = useTabStore()
const title = ref('')
</script>

<style scoped></style>
