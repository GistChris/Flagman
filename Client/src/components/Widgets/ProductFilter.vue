<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  filterText: String,
  filterCriteria: String,
});

const emits = defineEmits(["update-filter-text", "update-filter-criteria"]);

const localFilterText = ref(props.filterText);
const localFilterCriteria = ref(props.filterCriteria);

const updateFilterCriteria = (criteria: string) => {
  localFilterCriteria.value = criteria;
  emits("update-filter-criteria", criteria);
};

watch(localFilterText, (newVal) => {
  emits("update-filter-text", newVal);
});
</script>
<template>
  <div class="product-filter">
    <input v-model="localFilterText" placeholder="Recherche" />
  </div>
</template>
<style scoped>
.product-filter {
  display: flex;
  /* gap: 20px; */
}

* {
  width: 100%;
}
</style>
