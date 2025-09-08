<template>
  <div class="search-bar">
    <input type="text" v-model="searchText" placeholder="Recherchez" class="search-input" />
    <button class="search-button" @click="submitSearch">
      <div class="icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" class="icon">
          <path
            fill="white"
            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");

const submitSearch = () => {
  console.log(searchText.value); // Search logic goes here

  // ajoute la classe 'clicked' au bouton de recherche
  const searchButton = document.querySelector(".search-button");
  if (searchButton) {
    searchButton.classList.add("clicked");
    // enleve la classe 'clicked' apres 1.5 secondes
    setTimeout(() => {
      searchButton.classList.remove("clicked");
    }, 1500);
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  background-color: var(--bg-color);
  border-radius: 50px;
  width: 300px;
  height: 35px;
  margin: auto;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 50px;
  background-color: var(--bg-color);
}

.search-button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 5px;
  width: auto;
  height: auto;
  background-color: var(--button-color);
}

.icon {
  width: 24px;
  height: 24px;
}
@keyframes tornado {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(720deg) scale(1.5);
  }
  100% {
    transform: rotate(1440deg) scale(1);
  }
}

/* ajoute un effet de rotation au bouton de recherche */
.search-button.clicked .icon-container {
  animation: tornado 1s ease-in-out;
}
</style>
