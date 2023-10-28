<template>
  <div class="cart container">
    <div flex items-center justify-between>
      <div class="title">Ваши покупки</div>
      <div
        class="clean-cart"
        @click="clearCart"
        pointer
      >Очистить корзину</div>
      <trashbox-icon
        class="trashbox-icon"
        @click="clearCart"
      />
    </div>
    <div
      v-if="cardsForView.length === 0" class="loading">Тoваров нет</div>
    <div v-else class="cards">
      <product-card
        v-for="(card, index) in cardsForView"
        :key="card.id"
        :product-card="card"
        is-cart
        :amount-in-cart="cartStore.cart[index].amountInCart"
      />
    </div>
    <base-button
      class="order-btn"
      label="ЗАКАЗАТЬ"
      @click="toOrder"
    />
</div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import { useCartStore } from '@/stores/cart-store'
import { useProductsStore } from '@/stores/products-store'
import ProductCard from '@/components/ProductCard.vue'
import BaseButton from '@/ui/BaseButton.vue'
import type { IProductCard, TMessage } from '@/types'
import TrashboxIcon from '@/assets/icons/trashbox-icon.svg'


const cartStore = useCartStore()
const productsStore = useProductsStore()

const cardsForView = computed<IProductCard[]>(() => {
  if (cartStore.cart.length === 0 && productsStore.products.length === 0) return []
  return cartStore.cart.map(item => {
    return productsStore.products.find(card => card.id === item.cardId)!
  })

})

function clearCart() {
  cartStore.cart = []
}

const message: Ref<TMessage> = inject('message')!


function toOrder() {
  // router.push( на страницу офромления )
}

</script>

<style scoped>
.cart {
  padding-bottom: 120px;
  position: relative;
  min-height: calc(100vh - 220px);
}
.cards {
  margin-top: 32px;
}
.cards > * {
  margin-top: 16px;
}
.title {
  font-size: 28px;
  color: #333;
}
.clean-cart {
  font-size: 20px;
  color: #aaa;
  transition: all 0.5s;
}
.clean-cart:hover {
  color: #333;
  transition: all 0.5s;
}
.trashbox-icon {
  display: none;
}
.loading {
  font-size: 20px;
  margin-top: 20px;
}
.order-btn {
  position: absolute;
  bottom: 50px;
}

@media (max-width: 576px) {
  .cart {
    padding-bottom: 120px;
    position: relative;
    min-height: calc(100vh - 160px);
  }
  .clean-cart {
    display: none;
  }
  .trashbox-icon {
    display: block;
  }
}
</style>