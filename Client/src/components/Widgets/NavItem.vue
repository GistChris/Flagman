<script setup lang="ts">
const props = defineProps({
  icon: String,
  text: String,
  size: { type: Number, default: 32 },
  colorChange: { type: Boolean, default: true },
});
</script>

<template>
  <li :class="{ 'color-change': colorChange }">
    <a href="#" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 32 32"
        v-html="icon"
        class="icon"
      ></svg>
      <span class="text">{{ text }}</span>
    </a>
  </li>
</template>

<style scoped>
li {
  margin-right: 32px;
  font-size: 24px;
  font-weight: bold;
  color: var(--bg-color);
  cursor: pointer;
  transition: transform 0.3s;
  text-decoration: none;
}

a {
  font-size: 24px;
  text-decoration: none;
  color: var(--bg-color);
  display: flex;
  align-items: center;
}

svg {
  margin-right: 5px;
}

.large-text a {
  font-size: 48px;
}

/* animations */
.color-change:hover .icon,
.color-change:hover .text {
  animation: color-change 2s infinite;
}

@keyframes color-change {
  0% {
    color: #fdca40;
  }

  25% {
    color: #48cae4;
  }

  50% {
    color: #90e0ef;
  }

  75% {
    color: #ade8f4;
  }

  100% {
    color: #fdca40;
  }
}

.icon,
.text {
  transition: color 0.3s;
}

li:hover {
  transform: scale(1.1);
}

li:active {
  transform: scale(0.95);
}
</style>
