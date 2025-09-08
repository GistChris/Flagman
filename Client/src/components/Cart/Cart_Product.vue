<script setup lang="ts">
import ICartProduct from "../../interfaces/CartProduct.interface";
import { locale, currencyCode } from "../../data/config.ts";
import Button from "../Widgets/Button.vue";
import { ref } from "vue";

defineProps<{
  cartProduct: ICartProduct;
}>();

const emit = defineEmits<{
  (e: "deleteCartProduct", sku: number): void;
}>();

// animation & visuel
const isShrinking = ref(false);

const handleDelete = (sku: number) => {
  isShrinking.value = true;
};

const handleAfterLeave = (sku: number) => {
  emit("deleteCartProduct", sku);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(price);
};
</script>

<template>
  <transition name="fade" @after-leave="handleAfterLeave(cartProduct.sku)">
    <div
      v-if="!isShrinking"
      id="cartProduct"
      :class="{ 'grow-animation': !isShrinking, 'shrink-animation': isShrinking }"
    >
      <section id="imgAndTitle">
        <div class="image_container">
          <img id="product_image" :src="cartProduct.image || ''" alt="" />
        </div>
        <h4>{{ cartProduct.name }}</h4>
      </section>

      <section id="price">
        <span>
          <p>Prix : {{ formatPrice(cartProduct.regularPrice) }}</p>
        </span>
      </section>
      <div id="quantityDeleteWrapper">
        <section id="quantity">
          <span>
            <p>
              Quantité : <strong>{{ cartProduct.quantity }}</strong>
            </p>
          </span>

          <div id="quantityBtnWrapper">
            <Button
              @click="if (cartProduct.quantity != 1) cartProduct.quantity--;"
              button-color="var(--button-color)"
              icon-id="plus"
              button-hover-color="var(--accent-color)"
            ></Button>
            <Button
              @click="cartProduct.quantity++"
              button-color="var(--button-color)"
              icon-id="minus"
              button-hover-color="var(--accent-color)"
            ></Button>
          </div>
        </section>
        <section id="delete">
          <span class="btnWrapper">
            <a @click="handleDelete(cartProduct.sku)">supprimer</a>
          </span>
        </section>
      </div>
    </div>
  </transition>
</template>

<style scoped>
#cartProduct {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--bg-color);
  padding: 1rem;
  gap: 0.6rem;
}

#imgAndTitle {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

#imgAndTitle > h4 {
  display: flex;
  flex: 1 1 164px;
}

#quantityDeleteWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 0.6rem;
}

#product_image {
  border: 3px solid var(--button-color);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100px;
  min-height: 110px;
  object-fit: contain;
  padding: 5px;
  width: auto;
}

.image_container {
  align-items: flex-end;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  grid-row-end: 3;
  grid-row-start: 3;
  justify-content: flex-start;
  padding: 10px;
  position: relative;
}

.image_container::after,
.image_container::before {
  background: var(--button-color);
  content: "";
  height: 10px;
  position: absolute;
  width: 10px;
}

.image_container::before {
  border-top-left-radius: 5px;
  left: 0;
  top: 0;
}

.image_container::after {
  bottom: 0;
  right: 0;
}

#quantityBtnWrapper {
  display: flex;
  justify-content: space-between;
}

#quantityBtnWrapper > Button {
  margin-left: 10px;
}

#price {
  display: flex;
  align-items: center;
}

#quantity {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

#delete {
  display: flex;
}

img {
  display: flex;
  align-self: center;
  flex: 0 0 auto;
  max-height: 64px;
}

.btnWrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btnWrapper :hover {
  color: black;
  cursor: pointer;
}

/* animation */

@keyframes grow {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}

.grow-animation {
  animation: grow 0.4s ease-out;
}
</style>
