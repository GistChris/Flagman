<script setup lang="ts">
import { usePaginationStore } from "../../stores/paginationStore";

const paginationStore = usePaginationStore();

const nextPage = () => {
  if (paginationStore.currentPage < paginationStore.lastPage) {
    paginationStore.currentPage++;
  }
};

const prevPage = () => {
  if (paginationStore.currentPage > 1) {
    paginationStore.currentPage--;
  }
};
</script>

<template>
  <div class="pagination">
    <div>
      <svg width="64" height="64" transform="rotate(180)">
        <use xlink:href="@/assets/sprites.svg#first" @click="paginationStore.currentPage = 1"></use>
      </svg>
      <svg width="64" height="64" transform="rotate(180)">
        <use xlink:href="@/assets/sprites.svg#previous" @click="paginationStore.currentPage--"></use>
      </svg>
    </div>
    <div class="page-numbers">
      <a
        v-if="paginationStore.currentPage === 2 || paginationStore.currentPage === 3"
        @click="paginationStore.currentPage = 1"
        >1</a
      >
      <a v-if="paginationStore.currentPage === 3" @click="paginationStore.currentPage = 2">2</a>

      <div v-if="paginationStore.currentPage > 3">
        <a @click="paginationStore.currentPage -= 3">{{ paginationStore.currentPage - 3 }}</a>
        <a @click="paginationStore.currentPage -= 2">{{ paginationStore.currentPage - 2 }}</a>
        <a @click="paginationStore.currentPage -= 1">{{ paginationStore.currentPage - 1 }}</a>
      </div>

      <h1>{{ paginationStore.currentPage }}</h1>

      <div v-if="paginationStore.currentPage < paginationStore.lastPage - 2">
        <a @click="paginationStore.currentPage += 1">{{ paginationStore.currentPage + 1 }}</a>
        <a @click="paginationStore.currentPage += 2">{{ paginationStore.currentPage + 2 }}</a>
        <a @click="paginationStore.currentPage += 3">{{ paginationStore.currentPage + 3 }}</a>
      </div>
      <div v-if="paginationStore.currentPage === paginationStore.lastPage - 2">
        <a @click="paginationStore.currentPage += 1">{{ paginationStore.currentPage + 1 }}</a>
        <a @click="paginationStore.currentPage += 2">{{ paginationStore.currentPage + 2 }}</a>
      </div>
      <div v-if="paginationStore.currentPage === paginationStore.lastPage - 1">
        <a @click="paginationStore.currentPage += 1">{{ paginationStore.currentPage + 1 }}</a>
      </div>
    </div>
    <div>
      <svg width="64" height="64">
        <use xlink:href="@/assets/sprites.svg#next" @click="paginationStore.currentPage++"></use>
      </svg>
      <svg width="64" height="64">
        <use
          xlink:href="@/assets/sprites.svg#last"
          @click="paginationStore.currentPage = paginationStore.lastPage"
        ></use>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 0.5rem;
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  background: rgba(48, 102, 190, 0.2);
  width: 80%;
}

.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

a {
  margin: 0 0.5rem;
  font-size: 2.5rem;
  cursor: pointer;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 75px;
  text-align: center;
  display: inline-block;
  transition: all 0.3s ease;
}

h1 {
  margin: 0 0.5rem;
  font-size: 5rem;
}

svg {
  cursor: pointer;
  fill: currentColor;
  transition: all 0.3s ease;
}

/* animation */

a:hover {
  color: var(--accent-color);
  transform: scale(1.2);
  transition: all 0.3s ease;
  background-color: var(--primary-color);
}

a:active {
  color: var(--accent-color);
  transform: scale(0.85);
  transition: all 0.1s ease;
}

svg:hover {
  color: var(--accent-color);
  transition: all 0.3s ease;
}

svg:active {
  color: var(--primary-color);
  transition: all 0.1s ease;
}
</style>
