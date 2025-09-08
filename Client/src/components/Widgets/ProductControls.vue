<script setup lang="ts">
import { ref } from "vue";
import ProductFilter from "./ProductFilter.vue";
import SortSelector from "./SortSelector.vue";

const props = defineProps({
  filterText: String,
  filterCriteria: String,
});

const emits = defineEmits(["toggle-view", "update-filter-text", "update-filter-criteria", "update-sort"]);

const isDefaultView = ref(true); // true for default view, false for onsale view

const toggleView = () => {
  isDefaultView.value = !isDefaultView.value;
  emits("toggle-view");
};

const updateFilterText = (value: string) => {
  emits("update-filter-text", value);
};

const updateFilterCriteria = (value: string) => {
  emits("update-filter-criteria", value);
};

const emitHandleSort = (sortDetails: { criteria: string; order: string }) => {
  emits("update-sort", sortDetails);
};
</script>

<template>
  <div class="controls-wrapper">
    <div class="product-controls">
      <div class="controls">
        <ProductFilter
          :filterText="filterText"
          :filterCriteria="filterCriteria"
          @update-filter-text="updateFilterText"
          @update-filter-criteria="updateFilterCriteria"
        />
      </div>
      <div class="controls">
        <SortSelector @update-sort="emitHandleSort" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  margin-top: 10px;
  min-height: 30px;
  justify-content: center;
}
.controls-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 96%;
  margin-top: 10px;
}
.product-controls {
  width: 100%;
}
</style>
