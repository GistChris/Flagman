<script setup lang="ts">
import { computed, onBeforeMount, reactive } from "vue";
import { locale, currencyCode, taxRates } from "../../data/config.ts";
import ICartProduct from "../../interfaces/CartProduct.interface";
import cartProduct from "./Cart_Product.vue";
import btn from "../Widgets/Button.vue";
import { useUser } from "@/stores/userStore";
import type {  UserOrderInterface } from "src/interfaces/";
import { RouterLink, useRouter } from "vue-router";
import { ref, watch } from "vue";
const route = useRouter();
const userStore = useUser();
const props = defineProps<{ cartProductList: ICartProduct[] }>();
const emit = defineEmits<{
  (e: "deleteCartProduct", sku: number): void;
}>();

const state = reactive<UserOrderInterface>({
  shippingAddress: "",
  longDescription: "",
  paymentInfo: undefined,
  TPS: "",
  TVQ: "",
  orderTotal: "",
  email: "",
  order: [],
  subTotal: "",
  createdOrder: new Date(),
  index: undefined,
});

const subTotal = computed<number>(() => {
  return props.cartProductList.length !== 0
    ? props.cartProductList.reduce((subTotal, item) => subTotal + item.regularPrice * item.quantity, 0)
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

// animation & visuel

const animationActive = ref(false);
const previousLength = ref(props.cartProductList.length);

watch(props.cartProductList, () => {
  if (props.cartProductList.length > previousLength.value) {
    // Si un item est ajouter au panier on active l'animation mais pas pour la quantiter
    animationActive.value = true;
    setTimeout(() => (animationActive.value = false), 300); // Reset apres la fin de l'animation
  }
  previousLength.value = props.cartProductList.length;
});
// sélectionner les données de la liste d'adresses et de la liste des méthodes de paiement
let toggleAddress: boolean = true;
let toggleCard: boolean = true;

function selectAddress(index: number): void {
  toggleAddress = false;
  state.shippingAddress = userStore.currentUser?.addresses[index];
}
function selectCart(index: number) {
  toggleCard = false;
  state.paymentInfo = userStore.currentUser?.cards[index];
}
// enregistrer une nouvelle vente dans la base de données
const placeOrder = async () => {
  if (userStore.isAuthenticated) {
    state.email = userStore.currentUser?.local?.email;
    if (state.email) {
      const orderData: UserOrderInterface = {
        email: state.email,
        longDescription: state.longDescription,
        shippingAddress: state.shippingAddress,
        paymentInfo: state.paymentInfo,
        TPS: GSTAmount.value.toFixed(2).toString(),
        TVQ: QSTAmount.value.toFixed(2).toString(),
        orderTotal: Total.value.toFixed(2).toString(),
        subTotal: subTotal.value.toFixed(2).toString(),
        order: props.cartProductList,
        createdOrder: new Date().toDateString(),
        index: undefined,
      };
      await userStore.createOrder(orderData);
      props.cartProductList.length = 0;
    }
  }
};
</script>

<template class="cart-wrapper">
  <div class="cart-wrapper">
    <section id="shipping_payment"></section>
    <section id="cartProductSection">
      <cartProduct
        v-for="cartProduct in props.cartProductList"
        :key="cartProduct.sku"
        :cartProduct="cartProduct"
        @deleteCartProduct="emit('deleteCartProduct', cartProduct.sku)"
      />
    </section>
    <transition>
      <section
        v-if="props.cartProductList.length != 0"
        id="saleDataSection"
        :class="{ 'slide-animation': animationActive }"
      >
        <h2>Sommaire</h2>
        <div id="saleData">
          <p>Sous-total</p>
          <p>{{ formattedSubTotal }}</p>
          <p>TPS</p>
          <p>{{ formattedGSTAmount }}</p>
          <p>TVQ</p>
          <p>{{ formattedQSTAmount }}</p>
          <p>Expédition</p>
          <p>{{ formattedShippingFee }}</p>
          <h4>Total</h4>
          <h4>{{ formattedTotal }}</h4>
        </div>
        <div class="personal_data">
          <div class="shipping">
            <h2>Livraison</h2>
            <h3 v-if="toggleAddress == true">Choisissez votre adresse:</h3>

            <ul v-if="toggleAddress == true">
              <li
                v-for="(address, index) in userStore.currentUser?.addresses"
                :key="index"
                @click="selectAddress(index)"
              >
                {{ address }}
              </li>
            </ul>
            <h3 v-if="toggleAddress == false">Vous avez choisi votre adresse:</h3>
            <p v-if="state.shippingAddress !== null && toggleAddress == false">{{ state.shippingAddress }}</p>
          </div>
          <div class="payment">
            <h2>Paiement</h2>
            <h3 v-if="toggleCard == true">Choisissez votre paiement:</h3>
            <ul v-if="toggleCard == true">
              <li v-for="(card, index) in userStore.currentUser?.cards" :key="index" @click="selectCart(index)">
                {{ card }}
              </li>
            </ul>
            <h3 v-if="toggleCard == false">Vous avez choisi votre carte:</h3>
            <p v-if="state.paymentInfo !== null && toggleCard == false">{{ state.paymentInfo }}</p>
          </div>
        </div>
        <div class="buttons">
          <RouterLink to="/shop">
            <btn
              v-if="toggleCard == false"
              @click="placeOrder"
              buttonText="Passez la commande"
              buttonColor="var(--button-color)"
              buttonHoverColor="var(--accent-color)"
              style="width: 200px; font-size: large"
            >
            </btn>
          </RouterLink>
          <btn
            @click="route.push(`/invoice`)"
            buttonText="Imprimer la facture"
            buttonColor="var(--button-color)"
            buttonHoverColor="var(--accent-color)"
            style="width: 200px; font-size: large"
          >
          </btn>
        </div>
      </section>
      <section v-else id="saleDataSection" class="vide">
        <h2 class="centered-title">vide</h2>
      </section>
    </transition>
  </div>
</template>

<style scoped>
.personal_data {
  width: 500px;
  word-wrap: break-word;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.cart-wrapper {
  display: flex;
  flex-direction: row;
}

#cartProductSection {
  display: grid;
  grid-column: 1fr;
  row-gap: 10px;
  margin: 10px;
}
.vide {
  height: 60px;
  margin-top: -10px !important;
}

#saleDataSection {
  display: flex;
  height: max-content;
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-color);
  margin: 10px;
  padding: 1rem;
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

#saleData {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 0.2rem;
  margin: 12px 0 12px 0;
}

#saleData > *:nth-child(even) {
  display: flex;
  justify-content: right;
}

h2 {
  text-align: center;
}

/* animation */

#saleDataSection.slide-animation {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-300px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
