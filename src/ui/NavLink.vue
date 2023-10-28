<template>
  <div
    class="nav-link"
    :class="link.routeName === route.name && 'active-link'"
    @click="$router.push({ name: link.routeName })"
  >
    {{ link.label }}
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
</style>