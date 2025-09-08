<script setup lang="ts">
const props = defineProps<{
  rating: number;
  maxRating: number;
}>();
</script>

<template>
  <div class="galaxy">
    <span v-for="n in rating" :key="n">
      <img
        src="../../assets/fullstar.svg"
        class="fullstar star"
        :title="`Étoile # ${n} - Total ${rating}/${maxRating}`"
      />
    </span>
    <span v-for="n in maxRating - rating" :key="n">
      <img
        src="../../assets/emptystar.svg"
        class="star"
        :title="`Étoile # ${rating + n} - Total ${rating}/${maxRating}`"
      />
    </span>
  </div>
</template>

<style scoped>
.galaxy {
  margin: 0.5rem auto;
}
</style>
