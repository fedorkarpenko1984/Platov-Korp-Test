<template>
  <div v-if="!isCart" class="product-card">
    <div class="image">
      <img
        v-if="showImage"
        ref="image"
        :src="productCard.image"
        alt="Фото товара"
      >
      <div
        v-else
        class="placeholder"
        flex items-center justify-center
      >
        <camera-icon class="camera-icon" />
      </div>
    </div>
    <div class="content">
      <div class="title">{{ productCard.title }}</div>
      <div class="description">
        <div
          class="description__label"
        >
          ОПИСАНИЕ ТОВАРА
          <input
            type="text"
            pointer
            @click="isDescriptionOpen = !isDescriptionOpen"
            @blur="isDescriptionOpen = false"
          >
        </div>
        <transition name="description">
          <div
            v-if="isDescriptionOpen"
            class="description__text"
            v-html="productCard.description"
          ></div>
        </transition>
      </div>
      <div class="size" flex justify-between>Размеры: <span>{{ size }}</span></div>
      <div class="price-and-icon" flex justify-between>
        <div class="price">{{ productCard.price }} ₽</div>
        <cart-icon @click="addPropductToCart(productCard.id)" pointer />
      </div>
    </div>
  </div>


  <div
    v-else
    class="product-card-in-cart"
    flex
  >
    <close-icon
      class="close-icon"
      @click="cartStore.removeProductFromCart(productCard.id)"
    />

    <div class="image">
      <img
        v-if="showImage"
        ref="image"
        :src="productCard.image"
        alt="Фото товара"
      >
      <div
        class="placeholder"
        flex items-center justify-center
      >
        <camera-icon class="camera-icon" />
      </div>
    </div>

    <div class="content">
      <div class="title">{{ productCard.title }}</div>
      <div class="description">{{ cuttedDescription }}</div>
      <div class="price">{{ productCard.price }} ₽</div>
    </div>
    <div class="amount-block" flex items-center>
      <button
        class="amount-btn"
        @click="cartStore.decrementProductAmount(productCard.id)"
      >-</button>
      <div class="amount">{{ amountInCart }}</div>
      <button
        class="amount-btn"
        @click="addPropductToCart(productCard.id)"
      >+</button>
    </div>
  </div>

</template>



<script setup lang="ts">
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import type { IProductCard, TMessage } from '@/types'
import CameraIcon from '@/assets/icons/camera-icon.svg'
import CartIcon from '@/assets/icons/cart-icon.svg'
import CloseIcon from '@/assets/icons/close-icon.svg'
import { useCartStore } from '@/stores/cart-store'
import { useProductsStore } from '@/stores/products-store'

const props = defineProps<{
  productCard: IProductCard;
  isCart?: boolean;
  amountInCart?: number; 
}>()

const showImage = ref<boolean>(true)

const image = ref<HTMLImageElement | null>(null);

watch(image, () => {
  if (!image.value?.clientHeight) {
    showImage.value = false
  } 
})

const isDescriptionOpen = ref<boolean>(false);

const size = computed<string>(() => {
  return props.productCard.size.join(', ')
})

const cartStore = useCartStore();
const cuttedDescription = computed<string>(() => {
  return props.productCard.description.split('.')[0]
})

const productStore = useProductsStore()
const message: Ref<TMessage> = inject('message')!
function addPropductToCart(id: number) {
  const inWarehouseCOunt = productStore.products.find(product => product.id === id)!.count
  const inCartProduct = cartStore.cart.find(note => note.cardId === id)
  if (inWarehouseCOunt === 0) {
    message.value = {
      text: 'Данной позиции нет на складе',
      type: 'warning'
    }
    return
  }
  if (inCartProduct && inCartProduct.amountInCart >= inWarehouseCOunt) {
    message.value = {
      text: 'На складе нет нужного колличества',
      type: 'warning'
    }
    return
  }
  cartStore.addPropductToCart(id);
  message.value = {
    text: 'Товар добавлен в корзину',
    type: 'success'
  }
}

</script>

<style scoped lang="scss">
.camera-icon {
  width: 50%;
  height: 50%;
}
.placeholder {
  background: #BABABA;
  width: 100%;
  height: 100%;
}

.product-card {
  width: 280px;
  height: 450px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.20);
  border-radius: 10px;
  .image {
    width: 280px;
    height: 280px;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
  }
  .content {
    padding: 16px;
    .title {
      font-size: 24px;
      color: #333
    }
    .description {
      margin-top: 12px;
      width: 100%;
      position: relative;
      .description__label {
        color: #555;
        border-bottom: 1px solid #666;
        width: fit-content;
        font-size: 16px;
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 50;
          left: 0;
        }
      }
      .description__text {
        padding: 16px;
        position: absolute;
        top: 24px;
        left: -16px;
        width: 100%;
        font-size: 14px;
        color: #333333;
        backdrop-filter: blur(20px);
        border-radius: 6px;
        border-bottom: 1px solid #ddd;
      }
    }
    .size {
      margin-top: 16px;
    }
    .price-and-icon {
      margin-top: 16px;
      font-size: 18px;
    }
  }
}

@media (max-width: 1280px) {
  .product-card {
    width: 170px;
    height: 300px;
    .image {
      width: 170px;
      height: 170px;
    }
    .content {
      padding: 8px;
      .title {
        font-size: 18px;
        color: #333
      }
      .description {
        margin-top: 8px;
        .description__label {
          font-size: 12px;
        }
        .description__text {
          padding: 12px;
        }
      }
      .size {
        margin-top: 12px;
        font-size: 12px;
      }
      .price-and-icon {
        margin-top: 12px;
        font-size: 18px;
      }
    }
  }
}

.product-card-in-cart {
  width: 500px;
  height: 200px;
  position: relative;
  .image {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
  }
  .close-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  .content {
    padding: 8px;
    position: relative;
    .title {
      font-size: 24px;
      color: #333
    }
    .description {
      font-size: 14px;
      margin-top: 8px;
      padding-right: 20px;
      box-sizing: border-box;
    }
    .price {
      font-size: 18px;
      position: absolute;
      bottom: 48px;
      left: 208px;
      transform: none;
    }
  }
  .amount-block {
    position: absolute;
    bottom: 8px;
    left: 208px;
    gap: 12px;
    .amount-btn {
      width: 30px;
      height: 30px;
      font-size: 20px;
      border-radius: 6px;
      border: 1px solid #333;
    }
  }
}

@media (max-width: 576px) {
  .product-card-in-cart {
    width: 100%;
    height: 240px;
    .amount-block {
      left: 50px;
      bottom: 4px;
    }
    .content {
      .price {
        bottom: -0px;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
}

.description-enter-active {
  transition: all .8s ease;
}
.description-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.description-enter-to {
  opacity: 1;
}
.description-enter, .description-leave-to {
  opacity: 0;
}
</style>