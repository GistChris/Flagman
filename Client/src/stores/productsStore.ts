import { defineStore } from "pinia";
import type { ProductInterface } from "../interfaces/index";
import products from "../data/products.json";
import { useSaleStore } from "./saleStore";

export interface ProductsState {
  products: ProductInterface[];
  categoryFilter: string;
  brandFilter: string;
  maxPriceFilter: number;
  minPriceFilter: number;
  ratingFilter: number;
  sortCriteria: SortCriteria;
  sortOrder: SortOrder;
  searchKeyword: string;
}

enum SortCriteria { // type 0 1 2 3
  PRICE = "Prix",
  RATING = "Cote",
}

enum SortOrder {
  ASC = "⬆️",
  DESC = "⬇️",
}

export const useProducts = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    categoryFilter: "",
    brandFilter: "",
    maxPriceFilter: 0,
    minPriceFilter: 0,
    ratingFilter: 0,
    sortCriteria: SortCriteria.PRICE,
    sortOrder: SortOrder.DESC,
    searchKeyword: "",
  }),
  getters: {
    getSelectByCategory(state: ProductsState): ProductInterface[] {
      return state.products
        .filter((value, index, self) => index === self.findIndex((t) => t.category === value.category))
        .sort((c, d) => (c.category > d.category ? 1 : -1));
    },

    getBrandBySelect(state: ProductsState): ProductInterface[] {
      return state.products
        .filter((value, index, self) => index === self.findIndex((t) => t.manufacturer === value.manufacturer))
        .sort((a, b) => ((a.manufacturer ?? "").toLowerCase() > (b.manufacturer ?? "").toLowerCase() ? 1 : -1));
    },
    filteredProducts(state) {
      return state.products.filter((product) => product.name.includes(state.searchKeyword));
    },

    getProduct: (state: ProductsState) => (sku: number) => {
      const result = products.find((p) => p.sku.toString() === sku.toString())!;
      return result;
    },

    getFiltered(state: ProductsState): ProductInterface[] {
      let filteredProducts = this.filteredProducts;

      if (state.categoryFilter) {
        //si on a une catégorie de sélectionnée
        filteredProducts = filteredProducts.filter((product) => product.category === state.categoryFilter); //on filtre les produits par catégorie
      }
      if (state.brandFilter) {
        //si on a une marque de sélectionnée
        filteredProducts = filteredProducts.filter((product) => product.manufacturer === state.brandFilter); //on filtre les produits par marque
      }
      if (state.maxPriceFilter && state.minPriceFilter) {
        filteredProducts = filteredProducts.filter(
          (product) => product.salePrice >= state.minPriceFilter && product.salePrice <= state.maxPriceFilter
        );
      }
      if (state.ratingFilter) {
        filteredProducts = filteredProducts.filter(
          (product) => Math.round(product.customerReviewAverage ?? 0) == state.ratingFilter //on utilise 0 si customerReviewAverage est null
        );
      }

      // Sorting logic
      if (state.sortCriteria === SortCriteria.PRICE) {
        //si on a choisi de trier par prix
        filteredProducts.sort(
          (
            a,
            b //on compare chaque produit avec le suivant pour les trier
          ) => (state.sortOrder === SortOrder.ASC ? a.regularPrice - b.regularPrice : b.regularPrice - a.regularPrice) //si l'ordre est ascendant, on trie du plus petit au plus grand, sinon du plus grand au plus petit
        );
      } else if (state.sortCriteria === SortCriteria.RATING) {
        filteredProducts.sort((a, b) =>
          state.sortOrder === SortOrder.ASC
            ? Number(a.customerReviewAverage) - Number(b.customerReviewAverage)
            : Number(b.customerReviewAverage) - Number(a.customerReviewAverage)
        );
      }

      return filteredProducts;
    },
    getFilteredSale(state: ProductsState): ProductInterface[] {
      let filteredSaleProducts = this.getFiltered;
      return filteredSaleProducts.filter((item) => item.expirationDate != undefined);
    },
  },
  actions: {
    async fetchProducts() {
      let saleStore = useSaleStore();
      saleStore.fetchProducts();
      let sales = saleStore.get;

      this.products = products;
      for (let i = 0; i < products.length; i++) {
        for (const sale of sales) {
          if (this.products[i].sku == sale.sku) {
            this.products[i] = sale;
          }
        }
      }
    },

    handleSort({
      criteria,
      order,
      productList,
    }: {
      criteria: SortCriteria;
      order: SortOrder;
      productList?: ProductInterface[];
    }) {
      this.sortCriteria = criteria;
      this.sortOrder = order;

      const listToSort = productList || this.products;

      if (criteria === SortCriteria.PRICE) {
        listToSort.sort((a, b) =>
          order === SortOrder.ASC ? a.regularPrice - b.regularPrice : b.regularPrice - a.regularPrice
        );
      } else if (criteria === SortCriteria.RATING) {
        listToSort.sort((a, b) =>
          order === SortOrder.ASC
            ? Number(a.customerReviewAverage) - Number(b.customerReviewAverage)
            : Number(b.customerReviewAverage) - Number(a.customerReviewAverage)
        );
      }
    },

    remove(sku: number): void {
      const index = this.products.findIndex((product) => product.sku === sku);
      if (index !== -1) {
        this.products[index].expirationDate = undefined;
        this.products[index].salePercentage = undefined;
      }
    },
  },
});
