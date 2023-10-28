<template>
  <button class="btn-base" pointer>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<style scoped>
.btn-base {
  padding: 8px 16px;
  background: white;
  color: #333;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: 0px 0px 1px 0px #ccc;
  transition: all 0.3s;
}
.btn-base:hover {
  box-shadow: 0px 0px 3px 3px #ccc;
  transition: all 0.3s;
}
</style>