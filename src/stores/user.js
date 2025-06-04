// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user'
import { useCartStore } from "./cartStore";
export const userdefineStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }

  // 退出情空用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车action
    cartStore.clearCart()
  }
  return { userInfo, getUserInfo, clearUserInfo }
},
  {
    persist: true,
  })
