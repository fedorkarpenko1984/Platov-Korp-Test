import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TCartNote } from '@/types'

export const useCartStore = defineStore('cart', () => {

  const cart = ref<TCartNote[]>([])

  function addPropductToCart(id: number) {
    const item = cart.value.find(item => item.cardId === id);
    if (!item) {
      cart.value.push({
        cardId: id,
        amountInCart: 1
      })
    } else {
      const index = cart.value.findIndex(item => item.cardId === id)
      const newItem: TCartNote = { cardId: id, amountInCart: item.amountInCart + 1 }
      cart.value.splice(index, 1, newItem)
    }
  }

  function decrementProductAmount(id: number) {
    const index = cart.value.findIndex(item => item.cardId === id)
    if (cart.value[index].amountInCart === 1) cart.value.splice(index, 1)
      else cart.value[index].amountInCart--
  }

  function removeProductFromCart(id: number) {
    const index = cart.value.findIndex(item => item.cardId === id)
    cart.value.splice(index, 1)
  }

  return {
    cart,

    addPropductToCart,
    decrementProductAmount,
    removeProductFromCart
  }
})
