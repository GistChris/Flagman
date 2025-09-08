<script setup lang="ts">
import type Product from "src/interfaces/product.interface";
import { computed } from "vue";
import { locale, currencyCode } from "../../data/config.ts";
import Button from "../Widgets/Button.vue";
import Stars from "../Widgets/Stars.vue";
import { reactive, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
const route = useRouter();
const TimeRemaining: {
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
  stringFormat: string;
} = reactive({
  hours: 0,
  minutes: 0,
  seconds: 0,
  isEnded: computed(() => {
    if (TimeRemaining.hours < 0 && TimeRemaining.minutes < 0 && TimeRemaining.seconds < 0) {
      emit("removeSaleProduct", props.product.sku);
      return true;
    }
    return false;
  }),
  stringFormat: computed(
    () =>
      `${TimeRemaining.hours.toString().padStart(2, "0")}h ${TimeRemaining.minutes
        .toString()
        .padStart(2, "0")}m ${TimeRemaining.seconds.toString().padStart(2, "0")}s`
  ),
});

const formattedSalePercentage = computed(() => {
  return `${Math.round((props.product.salePercentage as number) * 100)}%`;
});

const priceClass = computed(() => {
  return props.product.salePercentage ? "sale-price" : ""; // si salePercentage est true, on retourne 'sale-price', sinon on retourne ''
});

onMounted(() => {
  if (props.product.expirationDate) {
    setTimeRemaining(getTimeDiff());
    const intervalTimerID = setInterval(() => {
      const millisecondRemaining = getTimeDiff();
      if (millisecondRemaining < 0) {
        clearInterval(intervalTimerID);
      }
      setTimeRemaining(millisecondRemaining);
    }, 1000);
  }
});

function getTimeDiff() {
  return new Date(<string>props.product.expirationDate).getTime() - Date.now();
}

function setTimeRemaining(millisecondRemaining: number) {
  TimeRemaining.hours = Math.floor((millisecondRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  TimeRemaining.minutes = Math.floor((millisecondRemaining % (1000 * 60 * 60)) / (1000 * 60));
  TimeRemaining.seconds = Math.floor((millisecondRemaining % (1000 * 60)) / 1000);
}

const props = withDefaults(defineProps<{ product: Product; locale: string }>(), { locale: locale }); //locale a convertir vers

const formattedPrice = computed(() => {
  return new Intl.NumberFormat(locale, {
    // using imported locale
    style: "currency",
    currency: currencyCode, // using imported currencyCode
  }).format(props.product.salePrice);
});

const formattedSalePrice = computed(() => {
  if (props.product.salePercentage) {
    return new Intl.NumberFormat(locale, {
      // using imported locale
      style: "currency",
      currency: currencyCode, // using imported currencyCode
    }).format(props.product.salePrice * (1 - props.product.salePercentage));
  } else {
    return formattedPrice;
  }
});

const productImage = computed(() => {
  return props.product.image ?? "src/assets/noimage.jpg";
});

const emit = defineEmits<{
  (e: "addCartProduct", sku: number): void;
  (e: "selectProduct", sku: number): void;
  (e: "removeSaleProduct", sku: number): void;
}>();

const formattedProductName = computed(() => {
  let productName = props.product.name;
  const formats = ["[DVD]", "[Blu-ray]"];
  formats.forEach((format) => {
    if (productName.includes(format)) {
      // si le nom du produit contient un des mots dans formats
      productName = productName.replace(format, "").replace(/\[\d{4}\]/g, ""); // on remplace le format par "" et on remplace les 4 chiffres entre crochets par ""
    }
  });
  return productName.trim();
});

const isDVDProduct = computed(() => {
  return props.product.name.includes("[DVD]");
});

const isBluRayProduct = computed(() => {
  return props.product.name.includes("[Blu-ray]");
});
</script>

<template>
  <div @click="route.push(`/product/${product.sku}`)" class="block_item">
    <div class="product_name">
      <h2 id="product_name">{{ formattedProductName }}</h2>
      <img v-if="isDVDProduct" src="src/assets/DVD.svg.png" />
      <img v-if="isBluRayProduct" src="src/assets/Bluray.svg.png" />
    </div>

    <div class="image_container">
      <img id="product_image" :src="productImage" alt="" />
    </div>
    <div class="ldescription">
      <p id="product_description" v-if="isDVDProduct || isBluRayProduct">{{ product.longDescription }}</p>
    </div>
    <div class="description">
      <div class="description_content">
        <p id="product_item">{{ `Item: ${product.sku}` }}</p>

        <h3 id="product_price">
          <div v-if="product.salePercentage" class="sale-info">
            <div style="display: flex; align-items: center" :class="priceClass">{{ formattedSalePrice }}</div>
            <div class="timer-info">
              <svg>
                <use :xlink:href="`src/assets/sprites.svg#timer`"></use>
              </svg>
              <p style="font-size: 20px; color: red">
                {{ TimeRemaining.isEnded ? "Terminée!" : TimeRemaining.stringFormat }}
              </p>
              <div class="sale-badge">{{ formattedSalePercentage }}</div>
            </div>
          </div>
          <div v-else>
            {{ formattedPrice }}
          </div>
        </h3>

        <div class="stars">
          <Stars :max-rating="5" :rating="Math.round(product.customerReviewAverage ?? 0)"></Stars>
        </div>
      </div>
    </div>
  </div>
  <div class="btns_item">
    <RouterLink to="/cart">
      <Button
        @click="emit('addCartProduct', product.sku)"
        button-color="var(--accent-color)"
        button-hover-color="var(--button-color)"
        button-text="Ajouter au panier"
        style="font-size: large"
      ></Button
    ></RouterLink>
    <RouterLink to="/share">
      <Button
        @click="emit('selectProduct', product.sku)"
        button-color="var(--button-color)"
        button-hover-color="var(--accent-color)"
        button-text="Partager"
        style="font-size: large"
      ></Button
    ></RouterLink>
  </div>
</template>

<style scoped>
.block_item {
  align-items: center;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 220px;
  justify-items: start;
  min-width: 550px;
  padding: 10px;
  width: 100%;
  min-height: 330px;
  margin: 5px;
}

.btns_item {
  width: 100%;
  align-items: center;
  display: flex;
  grid-column: 2;
  grid-row: 3;
  justify-content: space-between;
}

svg {
  height: 20px;
  width: 20px;
  color: red;
}

button {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin: 5px;
  width: 100%;
}
.description {
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  grid-column: 2;
  grid-row: 3;
  height: 100%;
  justify-self: end;
  min-width: 220px;
  padding: 10px;
  width: auto;
  grid-row: 3;
}
.image_container {
  align-items: flex-end;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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

img {
  height: 160px;
  object-fit: contain;
  width: auto;
  max-width: 300px;
}

#product_image {
  border: 5px solid var(--button-color);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 190px;
  min-width: 110px;
  max-height: 310px;
  max-width: 310px;
  object-fit: contain;
  padding: 5px;
  width: auto;
}
.product_name {
  align-items: center;
  display: flex;
  grid-column: 1 / -1;
}
.product_name img {
  height: 50px;
  margin-left: 10px;
  object-fit: contain;
  width: 50px;
}

#product_item {
  font-size: 1.2em;
  font-weight: bolder;
}

#product_name {
  font-size: 1.5em;
}

#product_price {
  font-size: 2em;
}

.stars {
  height: 50px;
  width: max-content;
}
.ldescription {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* sale */
.sale-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.timer-info {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: red;
}

.sale-badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 0.9em;
}
</style>
