<script setup lang="ts">
import Button from "../Widgets/Button.vue";
import { reactive, onBeforeMount } from "vue";
import { RouterLink, useRouter } from "vue-router";
const route = useRouter();
import type { UserOrderInterface } from "src/interfaces/";
import { useUser } from "@/stores/userStore";
const userStore = useUser();
const state = reactive<UserOrderInterface>({
  email: "",
  order: [],
  shippingAddress: "",
  paymentInfo: 0,
  TPS: "",
  TVQ: "",
  orderTotal: "",
  subTotal: "",
  createdOrder: new Date(),
  index: 0,
  longDescription: "",
});
const props = defineProps<{
  index: number;
}>();
const router = useRouter();
onBeforeMount(() => {
  state.index = props.index;
  state.order = userStore.currentUser?.orders[props.index][1];
  state.shippingAddress = userStore.currentUser?.orders[props.index][2];
  state.paymentInfo = userStore.currentUser?.orders[props.index][3];
  state.TPS = userStore.currentUser?.orders[props.index][5];
  state.TVQ = userStore.currentUser?.orders[props.index][6];
  state.orderTotal = userStore.currentUser?.orders[props.index][7];
  state.subTotal = userStore.currentUser?.orders[props.index][4];
  state.createdOrder = userStore.currentUser?.orders[props.index][0];
  state.email = userStore.currentUser?.local.email;
});
</script>
<template>
  <div class="container">
    <div class="orders">
      <h1>
        Détails de votre commande , {{ userStore.currentUser?.name }} , N 100{{ state.index }} du
        {{ state.createdOrder }}!
      </h1>
      <div class="order">
        <h2>Adresse d'expédition :</h2>
        <p>{{ state.shippingAddress }}</p>
        <h2>Informations sur le paiement :</h2>
        <p>{{ state.paymentInfo }}</p>
        <h2>Informations sur l'achat :</h2>
        <ul>
          <a v-for="(product, index) in state.order" :key="index"
            ><br><p>Product N {{ index + 1 }}</p>
            {{ product.longDescription }}
            <p>Quantité : {{ product.quantity }}</p></a
          >
        </ul>
        <h2>Prix de la commande : {{ state.subTotal }} CAD</h2>
        <h2>TPS : {{ state.TPS }} CAD</h2>
        <h2>TVQ : {{ state.TVQ }} CAD</h2>
        <h2>Total de la commande : {{ state.orderTotal }} CAD</h2>
      </div>
    </div>
    <Button
      @click="route.push(`/shop`)"
      buttonText="Imprimer"
      buttonColor="var(--button-color)"
      buttonHoverColor="var(--accent-color)"
      style="font-weight: 500; font-size: xx-large"
    >
    </Button>
  </div>
</template>
<style scoped>
.order {
  display: flex;
  width: 1000px;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  color: #444;
  gap: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}
.orders {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  gap: 30px;
  margin: 40px;
}
</style>
