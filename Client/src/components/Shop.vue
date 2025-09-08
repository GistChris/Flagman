<script setup lang="ts">
// ### Imports ###
import { ref, computed, toRefs, watch, onMounted } from "vue";
import Product from "./Products/Product.vue";
import Pagination from "./Widgets/Pagination.vue";
import Titre from "./Widgets/Titre.vue";
import ItemsPerPageSelector from "./Widgets/ItemsPerPageSelector.vue";
import { locale } from "../data/config.ts";
import Filters from "./Filters/Filters.vue";
import ProductControls from "./Widgets/ProductControls.vue";

// ### Stores ###
import { useProducts } from "../stores/productsStore";
import { usePaginationStore } from "../stores/paginationStore";
import { useCartStore } from "../stores/cartStore";


const cartStore = useCartStore();
const productsStore = useProducts();
const paginationStore = usePaginationStore();

paginationStore.initWatchers(); //watchers pour la pagination
// ### references et valeurs computed ###
const filterText = ref("");
const filterCriteria = ref("name");
let animate = ref(false);

let viewMode = ref("default"); // default, onsale

const products = computed(() => {
  if (viewMode.value != "onsale") {
    return productsStore.getFiltered;
  } else {
    return productsStore.getFilteredSale;
  }
});

const filteredProducts = computed(() => {
  if (!filterText.value) return products.value;

  return products.value.filter((product) => {
    const value = product[filterCriteria.value as keyof typeof product];
    if (typeof value === "string") {
      return value.toLowerCase().includes(filterText.value.toLowerCase());
    } else if (typeof value === "number") {
      return value.toString().includes(filterText.value);
    }
    return false;
  });
});

let paginatedProducts = computed(() => {
  let currentFilteredProducts = filteredProducts.value;

  const start = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
  const end = start + paginationStore.itemsPerPage;
  return currentFilteredProducts.slice(start, end);
});

// ### Methodes ###
const handleSort = ({ criteria, order }: { criteria: string; order: string }) => {
  productsStore.handleSort({ criteria: criteria as any, order: order as any });
};

const toggleView = () => {
  if (viewMode.value === "default") {
    viewMode.value = "onsale";
  } else {
    viewMode.value = "default";
  }
};

// ### Watchers et Lifecycle ###
watch(
  () => paginationStore.currentPage,
  () => {
    animate.value = true;
    setTimeout(() => {
      animate.value = false;
    }, 300);
  }
);

onMounted(() => {
  productsStore.fetchProducts(); // au moment du montage du composant on va chercher les produits dans le store pinia qui vas les chercher dans le json
  paginationStore.setTotalItems(productsStore.products.length); // on set le total d'items dans le store pinia "paginationStore"
});
</script>

<template>
  <div class="shop-wrapper" :class="{ fade: animate }">
    <div class="div1">
      <div class="titre">
        <Titre text="Filtres" size="64px"></Titre>
      </div>
      <ProductControls
        :filterText="filterText"
        :filterCriteria="filterCriteria"
        @toggle-view="toggleView"
        @update-filter-text="filterText = $event"
        @update-filter-criteria="filterCriteria = $event"
        @update-sort="handleSort"
      />
      <Filters></Filters>
    </div>
    <div class="div2">
      <div class="products-container">
        <div class="product-box">
          <div class="titre">
            <Titre :text="viewMode === 'default' ? 'Produits' : 'Offres'" size="64px"></Titre>

            <div class="itemsPP">
              <ItemsPerPageSelector
                :items-per-page="paginationStore.itemsPerPage"
                @update-items-per-page="paginationStore.itemsPerPage = $event"
              />
            </div>
          </div>
        </div>

        <Product
          v-for="product in paginatedProducts"
          :key="product.sku"
          :product="product"
          @add-cart-product="(sku) => cartStore.addCartProduct(sku)"
          @select-product="(sku) => cartStore.selectProduct(sku)"
          @remove-sale-product="
            (sku) => {
              productsStore.remove(sku);
            }
          "
          :locale="locale"
        />
      </div>
      <Pagination :current-page="paginationStore.currentPage" :last-page="paginationStore.lastPage" />
    </div>
  </div>
</template>

<style scoped>
.itemsPP {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  width: auto;
}
.shop-wrapper {
  display: flex;
  width: 100%;
  background-color: var(--bg-color-bg);
}

.div1
{
  flex-direction: column;
  flex: 1;
}
.div2 {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.products-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align the items to the left */
  width: 85%;
}

.product-box {
  display: flex;
  flex-direction: column;
  width: 100%;
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
