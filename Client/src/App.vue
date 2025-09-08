<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useUser } from "./stores/userStore";
import { useRouter } from "vue-router";
import { RouterView } from "vue-router";
const userStore = useUser();
const router = useRouter();
const signOut = async () => {
  await userStore.signOut();
  router.push("/signin");
};
</script>

<template>
  <div class="d-flex flex-column app-container">
    <Header :is-authenticated="userStore.isAuthenticated" @sign-out="signOut"></Header>
    <router-view class="flex-fill" />
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<style scoped>
.app-container {
  min-height: 100vh;
  background-image: url(./assets/background.jpg);
  background-size: cover;
}
</style>
