<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 获取导航列表
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
// import { getCategory } from '@/apis/testAPI'
const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})




</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key破坏复用机制 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />
  <LayoutFooter />
  <LayoutFixed />
</template>
