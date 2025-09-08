<script setup lang="ts">
import Button from "../Widgets/Button.vue";
import { useUser } from "@/stores/userStore";
const userStore = useUser();
</script>
<template>
  <div class="container">
    <div class="commandes">
      <h1>
        Votre commande,
        {{ userStore.currentUser?.name }} !
      </h1>

      <div class="container">
        <div>
          <ul>
            <li v-for="(address, index) in userStore.currentUser?.addresses" :key="index">
              {{ address }}
            </li>
          </ul>
        </div>
      </div>
      <Button
        buttonText="Confirmer la commande"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="font-weight: 500; font-size: xx-large"
      >
      </Button>
    </div>
  </div>
</template>
<style scoped>
li {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 1000px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  height: 100px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.commandes {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1000px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  gap: 30px;
  height: 400px;
}
</style>
