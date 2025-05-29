import { ElStep } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    const item = cartList.value.find((item) => item.skuId === goods.skuId)
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }

  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item) => {
      skuId == item.skuId
    })
    cartList.value.splice(idx, 1)
  }

  // 计算属性
  // 总数
  const allCount = computed(() => cartList.value.reduce((pre, cur) => { return pre + cur.count }, 0))
  // 总价
  const allPrice = computed(() => cartList.value.reduce((pre, cur) => { return pre + cur.count * cur.price }, 0))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice
  }
}, {
  persist: true
})
