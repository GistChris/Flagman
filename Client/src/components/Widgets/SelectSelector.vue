<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  options: {
    type: Array as () => string[],
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const selectedOption = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option: string) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>

<template>
  <div class="dropdown" @click="toggleDropdown" @mouseleave="closeDropdown">
    <div class="selected-option">
      {{ selectedOption }}
      <span :class="['arrow', { open: isOpen }]">&#9662;</span>
    </div>
    <transition name="slide-down">
      <div v-if="isOpen" class="options">
        <div v-for="option in props.options" :key="option" @click="selectOption(option)" class="option">
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.dropdown {
  position: relative;
  /* width: auto; */
  border: 1px solid var(--button-color);
  border-radius: 5px;
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: 1.5rem;
}

.selected-option {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--button-color);
  color: white;
}

.arrow {
  font-size: 2.5rem;
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid var(--button-color);
  border-top: none;
  border-radius: 0 0 5px 5px;
  max-height: 40vh;
  overflow-y: auto;
  z-index: 10;
  min-width: 100%;
  width: max-content;
}

.option {
  padding: 0.5rem;
  background-color: var(--bg-color);
  color: var(--button-color);
  transition: background-color 0.3s;
}

.option:hover {
  background-color: var(--accent-color);
  color: var(--bg-color);
}

/* Animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-50%) scaleY(0);
}

.slide-down-enter-to,
.slide-down-leave {
  transform: translateY(0) scaleY(1);
}
</style>
