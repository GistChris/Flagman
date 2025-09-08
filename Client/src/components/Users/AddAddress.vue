<script setup lang="ts">
import Button from "../Widgets/Button.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import type { UserAddressInterface } from "src/interfaces/";
import { useUser } from "@/stores/userStore";
const userStore = useUser();

const state = reactive<UserAddressInterface>({
  address: "",
  email: "",
  index: 0,
});
const props = defineProps<{
  index: number;
}>();
const router = useRouter();

const submit = async () => {
  if (userStore.isAuthenticated) {
    state.email = userStore.currentUser?.local?.email;
    if (state.email) {
      const adressData: UserAddressInterface = { address: state.address, email: state.email, index: state.index };
      await userStore.createAddress(adressData);
    }
  }

  if (!userStore.error) router.push("/signin");
};
</script>
<template>
  <div class="container">
    <div class="adresses">
      <h1>
        Votre adresse,
        {{ userStore.currentUser?.name }} !
      </h1>
      <input
        id="name"
        v-model="state.address"
        type="text"
        style="width: 90%; height: 100px"
        placeholder="Nom complet,Pays/région,Adresse postale,Code postal,Numéro de téléphone"
      />
      <Button
        @click="submit"
        buttonText="Ajouter"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="font-weight: 500; font-size: xx-large"
      >
      </Button>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.adresses {
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
