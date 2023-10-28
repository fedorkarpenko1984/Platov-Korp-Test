<template>
  <header class="header">
    <div class="header__inner container">
      <logo />
      <nav class="nav">
        <nav-link
          v-for="link in navLinks"
          :key="link.routeName"
          :link="link"
        />
      </nav>
      <menu-icon
        class="menu-icon"
        @click="isMenuOpen = true"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue'
import Logo from '@/ui/Logo.vue'
import NavLink from '@/ui/NavLink.vue'
import { navLinks } from '@/router/navLinks'
import MenuIcon from '@/assets/icons/menu-icon.svg'

const isMenuOpen: Ref<boolean> = inject('isMenuOpen')!


</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100px;
  &__inner {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.nav {
  display: flex;
  gap: 24px;
}
.menu-icon {
  display: none;
}
.burger-menu-line {
  width: 24px;
  height: 3px;
  background: #333;
}

@media (max-width: 768px) {
  .header {
    height: 60px;
    &__inner {
      display: flex;
      align-items: center;
      margin: 0 auto;
      padding: 0;
    }
  }
  .nav {
    display: none;
  }
  .menu-icon {
    display: block;
    width: 20px;
    height: 20px;
  }
}


</style>