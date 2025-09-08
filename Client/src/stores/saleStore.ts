import { defineStore } from "pinia";
import ProductInterface from "../interfaces/product.interface";
import saleProducts from "../data/saleProducts.json";

export interface SaleState {
  saleProducts: ProductInterface[];
}

export const useSaleStore = defineStore("sale", {
  state: (): SaleState => ({
    saleProducts: [],
  }),

  getters: {
    get(state: SaleState): ProductInterface[] {
      return state.saleProducts;
    },
  },

  actions: {
    async fetchProducts() {
      for (let i = saleProducts.length - 1; i >= 0; i--) {
        if (new Date(<string>saleProducts[i].expirationDate).getTime() < Date.now()) {
          saleProducts.splice(i, 1);
        }
      }
      this.saleProducts = saleProducts;
    },
    remove(sku: number) {
      const index = this.saleProducts.findIndex((sale) => sale.sku === sku);
      if (index !== -1) {
        this.saleProducts.splice(index, 1);
      }
    },
  },
});
