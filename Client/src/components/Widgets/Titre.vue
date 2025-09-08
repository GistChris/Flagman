<script setup lang="ts">
const props = defineProps({
  text: String,
  size: String,
});
</script>
<template>
  <div class="text">{{ text }}</div>
</template>
<style>
.text {
  font-size: v-bind(size);
}
</style>
