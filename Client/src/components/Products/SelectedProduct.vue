<script setup lang="ts">
import Product from "../Products/Product.vue";
import { useProducts } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";
import { onBeforeMount, watch } from "vue";
const productStore = useProducts();
const cartStore = useCartStore();

const props = defineProps<{
  sku: number;
}>();

</script>

<template>
  <div class="selected-product-wrapper">
    <div class="box-selected-product">
      <Product
        :product="productStore.getProduct(sku)"
        @add-cart-product="(sku) => cartStore.addCartProduct(sku)"
        @delete-cart-product="cartStore.removeCartProduct"
        locale="fr-CA"
      ></Product>
    </div>
  </div>
</template>

<style scoped>
.selected-product-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box-selected-product {
  display: flex;
  flex-flow: column;
  width: 600px;
}
</style>
