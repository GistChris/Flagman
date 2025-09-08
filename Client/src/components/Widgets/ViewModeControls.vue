<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  isActive: Boolean,
});

const emits = defineEmits(["toggle-view"]);

const emitToggleView = () => {
  emits("toggle-view");
};

const viewModeText = computed(() => (props.isActive ? "Offres" : "Produits"));
</script>

<template>
  <div class="viewmode-wrapper">
    <span class="viewmode-text">{{ viewModeText }}</span>
    <div class="toggle-container" :class="{ active: !props.isActive }" @click="emitToggleView">
      <div class="toggle-ball"></div>
    </div>
  </div>
</template>

<style scoped>
.viewmode-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.viewmode-text {
  font-size: 16px;
  font-weight: bold;
}

.toggle-container {
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-ball {
  width: 28px;
  height: 28px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: left 0.3s;
}

.toggle-container.active {
  background-color: var(--button-color);
}

.toggle-container.active .toggle-ball {
  left: 31px;
}
</style>
