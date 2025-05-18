import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';

export const useCategoryStore = defineStore('category', () => {
  // 导航数据管理
  const categoryList = ref([])

  const getCategory = async () => {
    const res = await getCategoryAPI()
    // console.log(res);
    categoryList.value = res.result
  }

  return {
    categoryList,
    getCategory
  }
})
