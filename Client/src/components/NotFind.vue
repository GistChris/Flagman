<script setup lang="ts">
import { RouterLink } from "vue-router";
import Titre from "./Widgets/Titre.vue";
import Button from "../components/Widgets/Button.vue";
</script>
<template>
  <div class="wrong-url">
    <RouterLink to="/shop">
      <Titre text="Page introuvable" size="84px" style="color: red;"></Titre>
    </RouterLink>
 
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
.wrong-url{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
</style>
