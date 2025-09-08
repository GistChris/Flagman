<script setup lang="ts">
import Button from "./Button.vue";

const props = defineProps<{
  itemsPerPage: number;
}>();

const emit = defineEmits<(event: "update-items-per-page", payload: number) => void>();

const updateItemsPerPage = (newItemsPerPage: number) => {
  emit("update-items-per-page", newItemsPerPage);
};
</script>

<template>
  <div class="items-per-page-selector">
    <p>Items par page:</p>
    <Button
      v-for="value in [5, 10, 20, 50, 100]"
      :key="value"
      :buttonText="`${value}`"
      buttonColor="var(--button-color)"
      buttonHoverColor="var(--accent-color)"
      @click="updateItemsPerPage(value)"
      :class="{ active: value === props.itemsPerPage }"
    />
  </div>
</template>

<style scoped>
.items-per-page-selector {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.items-per-page-selector .btn {
  width: 50px;
  box-shadow: 0px 0px 4px 0px black;
}

.active {
  background-color: var(--primary-color) !important;
}
</style>
