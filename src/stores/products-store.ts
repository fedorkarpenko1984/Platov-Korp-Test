import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProductCard } from '@/types'

export const useProductsStore = defineStore('products', () => {

  const products = ref<IProductCard[]>([]);

  async function getProducts() {
    const result = await fetch('https://api.platovcorp.site/product.json')
    const parsed = await result.json()
    products.value = await parsed.map((card: { [key: string]: string}) => ({
      id: parseInt(card.id),
      title: card.title,
      image: card.image,
      category: parseInt(card.category),
      description: card.description,
      price: parseInt(card.price),
      old_price: parseInt(card.old_price),
      count: parseInt(card.count),
      size: eval(card.size)
    }))
  }
  getProducts();

  return {
    products
  }
})
