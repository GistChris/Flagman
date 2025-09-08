<script setup lang="ts">
import { RouterLink } from "vue-router";
import NavItem from "./Widgets/NavItem.vue";
import SearchBar from "./Widgets/SearchBar.vue";
import { useCartStore } from "../stores/cartStore";
const cartStore = useCartStore();
defineProps<{ isAuthenticated: boolean }>();
const emit = defineEmits<{
  (e: "signOut"): void;
}>();
</script>

<template>
  <header class="header">
    <nav>
      <div class="nav-container">
        <div class="left-side">
          <RouterLink to="/shop">
            <NavItem
              text="Atlas"
              :size="52"
              class="large-text no-animation"
              :colorChange="false"
              style="text-decoration: none"
          /></RouterLink>
          <SearchBar />
        </div>
        <div class="right-side">
          <RouterLink to="/offres">
            <NavItem
              icon="<path fill='currentColor' d='M10 14a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4Zm0-6a2 2 0 1 0 1.998 2.004A2.002 2.002 0 0 0 10 8Z' /><path fill='currentColor' d='M16.644 29.415L2.586 15.354A2 2 0 0 1 2 13.941V4a2 2 0 0 1 2-2h9.941a2 2 0 0 1 1.414.586l14.06 14.058a2 2 0 0 1 0 2.828l-9.943 9.943a2 2 0 0 1-2.829 0ZM4 4v9.942L18.058 28L28 18.058L13.942 4Z'/>"
              text="Offres"
          /></RouterLink>

          <RouterLink to="/cart">
            <div class="cart">
              <NavItem
                icon="<circle cx='10' cy='28' r='2' fill='currentColor' /><circle cx='24' cy='28' r='2' fill='currentColor' /><path fill='currentColor' d='M28 7H5.82L5 2.8A1 1 0 0 0 4 2H0v2h3.18L7 23.2a1 1 0 0 0 1 .8h18v-2H8.82L8 18h18a1 1 0 0 0 1-.78l2-9A1 1 0 0 0 28 7Zm-2.8 9H7.62l-1.4-7h20.53Z'/>"
                text="Panier"
              />
              <p id="goods-quantity">
                {{ cartStore.cartProductList.length }}
              </p>
            </div></RouterLink
          >
          <RouterLink to="/profile">
            <NavItem
              icon="<path fill='currentColor' d='M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5Z' /><path fill='currentColor' d='M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0Z'/>"
              text="Profil"
          /></RouterLink>
          <template v-if="isAuthenticated">
            <NavItem @click="emit('signOut')" text="Déconnexion" />
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
#goods-quantity {
  font-size: xx-large;
  color: #eaee07;
  margin-left: -20px;
}
.cart {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
}
.header {
  background-color: var(--primary-color);
  height: 70px;
}

.nav-container {
  height: 70px;
  align-items: center;
  display: flex;
  justify-content: space-between;

  /* left */
  list-style-type: none;
}

.nav-container > div {
  display: flex;
  justify-content: flex-end;
  /* right */
}

ul {
  height: 70px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
}

.no-animation {
  animation: none !important;
  transition: none !important;
  transform: none !important;
}
.left-side {
  background: linear-gradient(-45deg, #f3f3f5, #775deb, #eaebac, #e96250);
  background-size: 300%;
  font-weight: 900;
  font-size: 5vw;
  letter-spacing: -5px;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 10s ease-in-out infinite;
  -moz-animation: animated_text 10s ease-in-out infinite;
  -webkit-animation: animated_text 10s ease-in-out infinite;
}

@keyframes animated_text {
  0% {
    background-position: 0px 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0px 50%;
  }
}
</style>
