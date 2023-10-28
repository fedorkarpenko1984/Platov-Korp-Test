<template>
  <div
    class="nav-link"
    :class="link.routeName === route.name && 'active-link'"
    @click="$router.push({ name: link.routeName })"
  >
    {{ link.label }}
    <div class="border"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { TNavLink } from '@/types'

defineProps<{ link: TNavLink }>()

const route = useRoute();
const router = useRouter();

</script>

<style scoped>
.nav-link {
  color: #333;
  cursor: pointer;
  transition: color 0.4s;
}

.active-link {
  color: #BA967D;
}
.border {
  width: 0;
  height: 1px;
  background: transparent;
  transition: all 0.4s;
}
.nav-link:hover .border {
  width: 100%;
  background: grey;
  transition: all 0.4s;
}
</style>