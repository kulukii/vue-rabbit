// 管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user'
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from '@/apis/cart'
export const userdefineStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 合并购物车
  await  mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))

    cartStore.updateNewList()
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
