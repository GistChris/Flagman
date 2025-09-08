<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "../components/Widgets/Button.vue";
import Titre from "./Widgets/Titre.vue";
</script>
<template>
  <div class="share">
    <Titre text="Vous avez partagé avec un ami!" size="44px" style="color: red"></Titre>
  
  <RouterLink to="/shop">
    <Button
      buttonText="Retour aux achats"
      buttonColor="var(--button-color)"
      buttonHoverColor="var(--accent-color)"
      style="font-size: large; width: 300px"
    >
    </Button
  ></RouterLink>
</div>
</template>
<style scoped>
.share {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
</style>
