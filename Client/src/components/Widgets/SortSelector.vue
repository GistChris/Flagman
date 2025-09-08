<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import SelectSelector from "./SelectSelector.vue";

const selectedCriteria = ref("Prix");
const selectedOrder = ref("⬆️");

const emit = defineEmits();

const applySort = () => {
  emit("update-sort", {
    criteria: selectedCriteria.value,
    order: selectedOrder.value,
  });
};
</script>

<template>
  <div class="sort-container">
    <SelectSelector :options="['Prix', 'Cote']" v-model="selectedCriteria" style="width: 100%;" />
    <SelectSelector :options="['⬆️', '⬇️']" v-model="selectedOrder" />
    <Button
      @click="applySort"
      button-color="var(--accent-color)"
      button-hover-color="var(--button-color)"
      button-text="Triez"
      class="btn sort-btn"
      >Triez
    </Button>
  </div>
</template>

<style scoped>
.sort-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
