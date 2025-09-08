<script setup lang="ts">
import Button from "../components/Widgets/Button.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import type { UserFormInterface } from "@/interfaces/user.interface";
import { useUser } from "@/stores/userStore";

const state = reactive<UserFormInterface>({
  name: "",
  email: "",
  password: "pass123",

});

const router = useRouter();
const userStore = useUser();

const submit = async () => {
  await userStore.createUser({ ...state });
  if (!userStore.error) router.push("/signin");
};
</script>
<template>
  <div class="signup">
    <div class="signup-container">
      <h1>Créer un compte</h1>
      <h3>Votre nom</h3>
      <input
        id="name"
        v-model="state.name"
        type="text"
        style="width: 100%; height: 30px"
        placeholder="Prénom et nom de famille"
      />
      <h3>Adresse électronique</h3>
      <input 
      id="email" 
      v-model="state.email" 
      type="email" 
      style="width: 100%; height: 30px" />
      <h3>Mot de passe</h3>
      <input
        id="password"
        v-model="state.password"
        type="password"
        style="width: 100%; height: 30px"
        placeholder="au moins 6 caractères"
      />
      <div>
        <p>
          {{ userStore.error }}
        </p>
      </div>
      <Button
        @click="submit"
        buttonText="Inscription"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="width: 100%"
      >
      </Button>
    </div>
  </div>
</template>
<style scoped>
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 10px;
}
.signup-container {
  display: flex;
  width: 400px;
  row-gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin: 40px;
  padding: 30px;
}
</style>