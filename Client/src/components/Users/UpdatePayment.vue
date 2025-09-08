<script setup lang="ts">
import Button from "../Widgets/Button.vue";
import { onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
import type { UserCardInterface } from "src/interfaces/";
import { useUser } from "@/stores/userStore";
const userStore = useUser();

const state = reactive<UserCardInterface>({
  cardNumber: 0,
  email: "",
  index: 0,
});
onBeforeMount(() => {
  state.index = props.index;
  state.cardNumber = userStore.currentUser?.cards[props.index];
  state.email = userStore.currentUser?.local.email;
});
const props = defineProps<{
  index: number;
}>();
const router = useRouter();

const updateCard = async () => {
  if (userStore.isAuthenticated) {
    state.email = userStore.currentUser?.local?.email;
    if (state.email) {
      const cardData: UserCardInterface = { cardNumber: state.cardNumber, email: state.email, index: state.index };
      await userStore.updateCard(cardData);
    }
  }

  if (!userStore.error) router.push("/signin");
};
const deleteCard = async () => {
  if (userStore.isAuthenticated) {
    state.email = userStore.currentUser?.local?.email;
    if (state.email) {
      const cardData: UserCardInterface = { cardNumber: state.cardNumber, email: state.email, index: state.index };
      await userStore.deleteCard(cardData);
    }
  }
  if (!userStore.error) router.push("/signin");
};
</script>
<template>
  <div class="container">
    <div class="cards">
      <h1>
        Votre paiement,
        {{ userStore.currentUser?.name }} !
      </h1>
      <input
        id="name"
        v-model="state.cardNumber"
        type="number"
        style="width: 90%; height: 100px;font-size: large;"
        placeholder="Entrez votre numéro de carte"
      />
      <Button
        @click="updateCard"
        buttonText="Modifier"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="font-weight: 500; font-size: large; width: 200px"
      >
      </Button>
      <Button
        @click="deleteCard"
        buttonText="Supprimer"
        buttonColor="var(--button-color)"
        buttonHoverColor="var(--accent-color)"
        style="font-weight: 500; font-size: large; width: 200px"
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
.cards {
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
