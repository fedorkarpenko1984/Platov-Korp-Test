<template>
  <app-header />
  <mobile-menu :show="isMenuOpen" />
  <div
    class="message-wrapper"
    :class="message.text ? 'show' : 'hide'"
  >
    <message />
  </div>
  <slot />
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import Message from '@/ui/Message.vue'
import type { TMessage } from '@/types'
import { useRoute } from 'vue-router'

const isMenuOpen = ref<boolean>(false)
const message = ref<TMessage>({
  text: '',
})

provide('isMenuOpen', isMenuOpen)
provide('message', message)

let timer: number | null = null
watch(message, () => {
  if (!message.value.text) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    message.value = { text: '' }
    timer = null
  }, 1800)
})

const route = useRoute();
watch(route, () => {
  message.value = { text: '' }
})

window.addEventListener('resize', () => {
  isMenuOpen.value = false
})

</script>

<style scoped>
.message-wrapper {
  position: absolute;
  top: 200px;
  transform: translate(-50%);
  left: 50%;
  transition: all .3s;
}
.show {
  opacity: 1;
}
.hide {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>