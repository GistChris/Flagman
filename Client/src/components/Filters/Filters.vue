<script setup lang="ts">
import Button from "../Widgets/Button.vue";
import { onMounted } from "vue";
import Stars from "../Widgets/Stars.vue";
import { useProducts } from "../../stores/productsStore";
import Selector from "../Widgets/SelectSelector.vue";

const productsStore = useProducts();

onMounted(() => {
  productsStore.fetchProducts();
});

function clearFilters() {
  productsStore.ratingFilter = 0;
  productsStore.categoryFilter = "";
  productsStore.brandFilter = "";
  productsStore.maxPriceFilter = 0;
  productsStore.minPriceFilter = 0;
}
</script>

<template>
  <div class="filters">
    <div class="selectors">
      <div><p>Filtrer par catégorie</p></div>
      <div>
        <Selector
          :options="productsStore.getSelectByCategory.map((product) => product.category)"
          v-model="productsStore.categoryFilter"
        ></Selector>
      </div>
      <div><p>Filtrer par nom</p></div>
      <div>
        <Selector
          :options="
            productsStore.getBrandBySelect.map((product) => (product.manufacturer ? product.manufacturer : 'Vide'))
          "
          v-model="productsStore.brandFilter"
        ></Selector>
      </div>
    </div>
    <div class="prix-filter">
      <div><h2>Filtrer par prix</h2></div>
      <div>
        <label for="max_price">Prix minimum</label>
        <input v-model="productsStore.maxPriceFilter" id="max_price" type="number" min="0" />
      </div>
      <div>
        <label for="min_price">Prix maximum</label>
        <input v-model="productsStore.minPriceFilter" id="min_price" type="number" min="0" />
      </div>
    </div>
    <div class="rating-filter">
      <div><p>Filtrer par évaluation</p></div>
    </div>
    <div>
      <input
        v-model="productsStore.ratingFilter"
        type="range"
        class="filter-rating"
        name="filter-rating"
        min="0"
        max="5"
      />
      <div id="rating">{{ productsStore.ratingFilter }}</div>
      <Stars v-model="productsStore.ratingFilter" :max-rating="productsStore.ratingFilter" :rating="0"></Stars>
    </div>
    <div>
      <Button
        button-color="var(--button-color)"
        button-hover-color="var(--accent-color)"
        button-text="Réinitialiser"
        @click="clearFilters"
      ></Button>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}
#rating {
  font-size: 2rem;
  font-weight: bold;
  color: var(--button-color);
  margin-top: 10px;
}

input,
select {
  font: inherit;
  padding: 5px;
  border: var(--dark-border);
  border-radius: var(--border-radius);
  margin: 10px 0;
}

.filter-rating {
  color: var(--button-color);
  width: 100%;
}

.filters {
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
