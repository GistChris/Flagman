<script setup lang="ts">
const props = defineProps<{
  buttonText?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  imageSrc?: string;
  iconId?: string;
  iconSize?: string;
}>();
const computedIconSize = props.iconSize || "2rem";
</script>

<template>
  <button class="btn">
    {{ buttonText }}
    <img v-if="imageSrc" :src="imageSrc" alt="" />
    <svg
      v-if="props.iconId"
      :style="{ width: computedIconSize, height: computedIconSize }"
      class="icon"
      aria-hidden="true"
    >
      <use :xlink:href="`src/assets/sprites.svg#${props.iconId}`"></use>
    </svg>
  </button>
</template>

<style scoped>
.btn {
  border: none;
  padding: 0.7rem;
  cursor: pointer;
  background-color: v-bind(buttonColor);
  transition: background-color 0.3s ease;
  border-radius: 5px;
  color: white;
}

.btn:hover {
  background-color: v-bind(buttonHoverColor);
  transition: background-color 0.3s ease;
}
</style>
