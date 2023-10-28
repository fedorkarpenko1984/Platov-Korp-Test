<template>
  <div
    class="mobile-menu"
    :class="show && 'opened'"
  >
    <div class="wrapper" flex items-center justify-between>
      <logo class="logo" />
      <close-icon
        pointer
        @click="isMenuOpen = false"
      />
    </div>
    <nav-link
      v-for="link in navLinks"
      :key="link.routeName"
      :link="link"
      @click="isMenuOpen = false"
      class="link"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'; 
import Logo from '@/ui/Logo.vue'
import NavLink from '@/ui/NavLink.vue'
import { navLinks } from '@/router/navLinks'
import CloseIcon from '@/assets/icons/close-icon.svg'

const isMenuOpen = inject('isMenuOpen')

defineProps<{
  show: boolean;
}>()


</script>

<style scoped>
:deep(.nav-link) {
  font-size: 24px;
}
.mobile-menu {
  max-width: 100%;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: -100vw;
  border-right: 1px solid #ccc;
  background: white;
  transition: all 0.7s;
  padding: 0 24px;
  box-sizing: border-box;
  z-index: 100;
}
.opened {
  left: 0;
}
.link {
  margin: 0px auto 20px;
  width: fit-content;
}
.wrapper {
  height: 60px;
  box-sizing: border-box;
}
</style>