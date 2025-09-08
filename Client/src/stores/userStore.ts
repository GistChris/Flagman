import { defineStore } from "pinia";
import { signIn, fetchCurrentUser, createUser, signOut, createAddress,
  updateAddress,deleteAddress, createCard, deleteCard,updateCard,createOrder } from "@/shared/services";

import type { UserInterface, UserFormInterface, SigninFormInterface,
   UserAddressInterface,UserCardInterface,UserOrderInterface } from "@/interfaces";

interface UserState {

  currentUser: UserInterface |null | undefined;
  error: any;
}

export const useUser = defineStore("user", {
  state: (): UserState => ({
    currentUser: undefined,
    error: null,
  }),
  getters: {
    //Objectif: Retourner vrai si l'utilisateur est authentifié
    isAuthenticated(): boolean {
      return !!this.currentUser;
    },
  },
  actions: {
    //Objectif: Appeler le service de création d'utilisateur et mettre à jour le currentUser
    async createUser(data: UserFormInterface) {
      try {
        this.currentUser = await createUser(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async createAddress(data:  UserAddressInterface) {
      try {
        this.currentUser = await createAddress(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async createOrder(data:  UserOrderInterface) {
      try {
        this.currentUser = await createOrder(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
   
    async updateAddress(data:  UserAddressInterface) {
      try {
        this.currentUser = await updateAddress(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async deleteAddress(data:  UserAddressInterface) {
      try {
        this.currentUser = await deleteAddress(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async createCard(data:  UserCardInterface) {
      try {
     
        this.currentUser = await createCard(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async updateCard(data:  UserCardInterface) {
      try {
       
        this.currentUser = await updateCard(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
    async deleteCard(data:  UserCardInterface) {
      try {
     
        this.currentUser = await deleteCard(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },
   
    //Objectif: Appeler le service de connexion d'utilisateur et mettre à jour le currentUser
    async signIn(data: SigninFormInterface) {
      try {
        this.currentUser = await signIn(data);
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    //Objectif: Appeler le service de récupération d'utilisateur et mettre à jour le currentUser
    async fetchCurrentUser() {
      try {
        this.currentUser = await fetchCurrentUser();
        this.error = null;
      } catch (error) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    //Objectif: Appeler le service de déconexxion d'utilisateur et mettre à jour le currentUser
    async signOut() {
      try {
        await signOut();
        this.currentUser = undefined;
        this.error = null;
      } catch (error) {
        this.error = error;
      }
    },
  },
});
