<script setup lang="ts">
import Titre from "./Widgets/Titre.vue";
import { useUser } from "@/stores/userStore";
import { useRouter } from "vue-router";
const route = useRouter();
const userStore = useUser();
</script>
<template>
  <div class="profile">
    <h1>
      Bienvenue sur votre profil,
      {{ userStore.currentUser?.name }} !
    </h1>
    <div class="container">
      <Titre text="Vos adresses:" size="44px"></Titre>
      <div class="add-address" @click="route.push(`/newaddress`)">
        <Titre text="Ajouter une adresse +" size="34px"></Titre>
      </div>
      <div>
        <ul>
          <li
            v-for="(address, index) in userStore.currentUser?.addresses"
            :key="index"
            @click="route.push(`/address/${index}`)"
          >
            {{ address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <Titre text="Vos cards:" size="44px"></Titre>
      <div class="add-address" @click="route.push(`/newcard`)">
        <Titre text="Ajouter une carte  +" size="34px"></Titre>
      </div>
      <div>
        <ul>
          <li
            v-for="(card, index) in userStore.currentUser?.cards"
            :key="index"
            @click="route.push(`/payment/${index}`)"
          >
            {{ card }}
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <Titre text="Vos commandes:" size="44px"></Titre>
      <div>
        <ul>
          <li
            v-for="(address, index) in userStore.currentUser?.orders"
            :key="index"
            @click="route.push(`/commande/${index}`)"
          >
            <p>Numéro de commande N 100{{ index }}</p>
            <p>Date de création: {{ address[0] }},</p>
            <p>Adresse livraison: {{ address[2] }},</p>
            <p>Détails de la carte: {{ address[3] }},</p>
            <p>Subtotal: {{ address[4] }},</p>
            <p>TPS: {{ address[5] }},</p>
            <p>TVQ: {{ address[6] }},</p>
            <p>Total: {{ address[7] }},</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
li {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
  width: 1000px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  height: 100px;
  font-size: large;
  word-wrap: break-word;
  height: max-content;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: rgb(245, 245, 241);
}
.container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.add-address {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1000px;
  background: var(--bg-color);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}
</style>
