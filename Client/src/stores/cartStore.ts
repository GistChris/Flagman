import { defineStore } from "pinia";
import ICartProduct from "../interfaces/CartProduct.interface";
import { useProducts } from "./productsStore";
export const useCartStore = defineStore({
  id: "cartStore",

  state: () => ({
    cartProductList: [] as ICartProduct[],
  }),

  actions: {
    addCartProduct(sku: number) {
      const productsStore = useProducts(); //ici on dois utiliser useProducts pour avoir acces au store de products
      const product = productsStore.products.find((p) => p.sku === sku);
      if (!product) return;

      const cartProduct: ICartProduct = {
        ...product,
        quantity: 1,
      };

      const index = this.cartProductList.findIndex((p) => p.sku === sku);
      if (index !== -1) {
        this.cartProductList[index].quantity++;
      } else {
        this.cartProductList.push(cartProduct);
      }
    },

    selectProduct(sku: number) {
      const productsStore = useProducts(); //ici on dois utiliser useProducts pour avoir acces au store de products
      const product = productsStore.products.find((p) => p.sku === sku)!;
      return product;
    },

    removeCartProduct(sku: number) {
      const index = this.cartProductList.findIndex((cartProduct) => cartProduct.sku === sku);
      if (index !== -1) {
        this.cartProductList.splice(index, 1);
      }
    },
  },
});
