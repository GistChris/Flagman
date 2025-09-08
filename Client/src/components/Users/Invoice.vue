<script setup lang="ts">
import Button from "../Widgets/Button.vue";
import { useUser } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";
import { locale, currencyCode, taxRates } from "../../data/config.ts";
import { RouterLink } from "vue-router";

const cartStore = useCartStore();
const userStore = useUser();
const subTotal = computed<number>(() => {
  return cartStore.cartProductList.length !== 0
    ? cartStore.cartProductList.reduce((subTotal, item) => subTotal + item.regularPrice * item.quantity, 0)
    : 0;
});

const GSTAmount = computed<number>(() => taxRates.GST * subTotal.value);
const QSTAmount = computed<number>(() => taxRates.QST * subTotal.value);
const shippingFee = computed<number>(() => (subTotal.value >= 200 ? 0 : 15));
const Total = computed<number>(() => subTotal.value + GSTAmount.value + QSTAmount.value + shippingFee.value);

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};
const formattedSubTotal = computed<string>(() => formatPrice(subTotal.value));
const formattedGSTAmount = computed<string>(() => formatPrice(GSTAmount.value));
const formattedQSTAmount = computed<string>(() => formatPrice(QSTAmount.value));
const formattedShippingFee = computed<string>(() => formatPrice(shippingFee.value));
const formattedTotal = computed<string>(() => formatPrice(Total.value));
</script>
<template>
  <div class="invoice">
    <div class="invoice-container">
      <h1>Merci pour votre achat, {{ userStore.currentUser?.name }}!</h1>
      <h1>Détails de votre facture du {{ new Date().toDateString() }}!</h1>
      <h3>Acheter : {{ userStore.currentUser?.name }}</h3>
      <h3>Date de création : {{ new Date().toDateString() }}</h3>
      <div id="saleData">
        <section id="cartProductSection">
          <ul>
            <a v-for="(product, index) in cartStore.cartProductList" :key="index"
              ><h2>Product N {{ index + 1 }}</h2>
              <P> Numéro d'article: {{ product.sku }}</P>
              <P>Description: {{ product.longDescription }}</P>
              <P> Prix Unitaire : {{ product.salePrice }} CAD </P>
              <P> Quantité: {{ product.quantity }}</P>
            </a>
          </ul>
          <h1>Prix de la facture : {{ formattedSubTotal }} CAD</h1>
          <h1>TPS : {{ formattedGSTAmount }} CAD</h1>
          <h1>TVQ : {{ formattedQSTAmount }} CAD</h1>
          <h1>Total de la facture : {{ formattedTotal }} CAD</h1>
        </section>
      </div>
    </div>
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
.invoice {
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 10px;
  padding: 40px;
}
a {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 10px;
}
p {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.invoice-container {
  display: flex;
  width: 1000px;
  row-gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin: 40px;
  padding: 30px;
}
</style>
