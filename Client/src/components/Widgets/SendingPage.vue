<script setup lang="ts">
import { RouterLink } from "vue-router";
import Titre from "./Titre.vue";
</script>
<template>
  <div class="wrong-url">
    <RouterLink to="/shop">
      <Titre text="Vouz aves partager votre achat!" size="84px" style="color: red;"></Titre>
    </RouterLink>
  </div>
</template>
<style scoped>
.wrong-url{
display: flex;
align-items: center;
justify-content: center;
}
</style>
