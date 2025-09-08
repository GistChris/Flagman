<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Widgets/Button.vue";
import { RouterLink } from "vue-router";
import type { SigninFormInterface } from "@/interfaces/user.interface";
import { useUser } from "@/stores/userStore";

const state = reactive<SigninFormInterface>({
  email: "",
  password: "pass123",
  address:"",
});

const router = useRouter();
const userStore = useUser();

const submit = async () => {
  await userStore.signIn({ ...state });
  if (!userStore.error) router.push("/shop");
};


</script>
<template>
  <div class="signin">
    <div class="signin-container">
      <h1>Se connecter</h1>
      <h3>Adresse électronique</h3>
      <input v-model="state.email" type="email" style="width: 100%; height: 30px" />
      <h3>Mot de passe</h3>
      <input v-model="state.password" type="password" style="width: 100%; height: 30px" />
      <div>
        <p>
          {{ userStore.error }}
        </p>
      </div>
      <Button
        @click="submit"
        buttonText="Connexion"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="width: 100%;font-size: x-large"
      >
      </Button>
    </div>
    <h1>Nouveau chez ATLAS?</h1>
    <RouterLink to="/signup">
      <Button
        buttonText="Créez votre compte Atlas"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="width: 400px; font-size: x-large"
      >
      </Button
    ></RouterLink>
  </div>
</template>
<style scoped>
.signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-evenly;
}
.signin-container {
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
  margin-top: 20px;
  padding: 30px;
}
</style>
