import { defineStore } from "pinia";
import { watch } from "vue";

interface PaginationState {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

export const usePaginationStore = defineStore({
  id: "paginationStore",
  state: (): PaginationState => ({
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  }),
  getters: {
    lastPage(state) {
      return Math.ceil(state.totalItems / state.itemsPerPage);
    },
  },
  actions: {
    setTotalItems(newTotal: number) {
      this.totalItems = newTotal;
    },
    initWatchers() {
      // reset currentPage a 1 quand itemsPerPage change
      watch(
        () => this.itemsPerPage,
        () => {
          this.currentPage = 1;
        }
      );

      // faire sure que currentPage n'est jamais plus grand que lastPage
      watch(
        () => this.lastPage,
        (newLastPage) => {
          if (this.currentPage > newLastPage) {
            this.currentPage = newLastPage;
          }
        }
      );

      // faire sure que currentPage n'est jamais plus petit que 1
      watch(
        () => this.currentPage,
        (newCurrentPage) => {
          if (newCurrentPage < 1) {
            this.currentPage = 1;
          } else if (newCurrentPage > this.lastPage) {
            this.currentPage = this.lastPage;
          }
        }
      );
    },
  },
});

// watch(lastPage, (newLastPage) => {
//   // newLastPage est la nouvelle valeur de lastPage
//   if (currentPage.value > newLastPage) {
//     currentPage.value = newLastPage;
//   }
// });

// watch(currentPage, (newCurrentPage) => {
//   // faire sure que currentPage n'est jamais plus petit que 1
//   if (newCurrentPage < 1) {
//     currentPage.value = 1;
//   }

//   // faire sure que currentPage n'est jamais plus grand que lastPage
//   if (newCurrentPage > lastPage.value) {
//     currentPage.value = lastPage.value;
//   }
// });
