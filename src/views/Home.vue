<template>
  <main class="container">
    <div class="cards">
      <product-card
        v-for="card in paginatedCards"
        :key="card.id"
        :product-card="card"
      />
    </div>
    <div flex justify-center>
      <base-button
        @click="paginationCounter++"
        label="ПОКАЗАТЬ ЕЩЕ"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useProductsStore } from '@/stores/products-store'
import ProductCard from '@/components/ProductCard.vue'
import BaseButton from '@/ui/BaseButton.vue'
import type { IProductCard } from '@/types';

const productStore = useProductsStore()

const paginationCounter = ref<number>(0)

const paginatedCards = computed<IProductCard[]>(() => {
  if (paginationCounter.value * 4 >= productStore.products.length) paginationCounter.value = 0
  const start = paginationCounter.value * 4 >= productStore.products.length ? 0 : paginationCounter.value * 4
  let end = start + 4 >= productStore.products.length ? productStore.products.length : start + 4;
  return productStore.products.slice(start, end)
})

</script>

<style scoped>
.cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}

@media (max-width: 1280px) {
  .cards {
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 16px;
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
