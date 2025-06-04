import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { userdefineStore } from '@/stores/user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = userdefineStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])

  // 获取最新购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result

  }
  // 添加购物车
  const addCart = async (goods) => {
    if (isLogin) {
      const { skuId, count } = goods
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      const item = cartList.value.find((item) => item.skuId === goods.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }
  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const idx = cartList.value.findIndex((item) => {
        skuId == item.skuId
      })
      cartList.value.splice(idx, 1)
    }
  }



  // 单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选
  const allCheck = (selected) => {
    cartList.value.forEach(item => {
      item.selected = selected
    })
  }

  // 计算属性
  // 总数
  const allCount = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count, 0))
  // 总价
  const allPrice = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0))
  // 已选数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.count * cur.price, 0))


  // 全选
  const isAll = computed(() => cartList.value.every(item => item.selected))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true
})
