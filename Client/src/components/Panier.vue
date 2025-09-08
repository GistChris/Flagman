<script setup lang="ts">
import Cart from "./Cart/Cart.vue";
import Titre from "./Widgets/Titre.vue";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();
</script>
<template>
  <div class="cart">
    <div class="cart-box">
      <div class="titre">
        <Titre text="Panier" size="64px"></Titre>
      </div>
      <Cart :cart-product-list="cartStore.cartProductList" @delete-cart-product="cartStore.removeCartProduct" />
    </div>
  </div>
</template>
<style scoped>
.cart {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-box {
  display: flex;
  justify-content: center;

  flex-direction: column;
  width: 900px;
  text-align: center; /* Align the text to the left within the product-box */
}

.titre {
  position: relative;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animation */
@keyframes fadeInOutIn {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.1;
  }
  40% {
    opacity: 0.3;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
.fade {
  animation: fadeInOutIn 0.3s;
}
</style>
