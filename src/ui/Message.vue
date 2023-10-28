<template>
  <div
    class="message"
    :class="message.type || ''"
  >
    {{ message.text }}
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
const message = inject('message')
</script>

<style scoped>
.message {
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 10px;
}
.warning {
  color: rgb(255, 123, 0);
  background: rgb(235, 193, 8);
}
.success {
  color: rgb(16, 133, 16);
  background: rgb(11, 233, 11);
}
</style>