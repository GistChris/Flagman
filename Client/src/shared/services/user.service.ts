import type {
  UserFormInterface,
  UserInterface,
  UserAddressInterface,
  UserCardInterface,
  UserOrderInterface,
} from "@/interfaces";
import axios from "axios";

const BASE_URL = "/api/users";
const BASE_URL1 = "/api/users/address";
const BASE_URL2 = "/api/users/update_address";
const BASE_URL3 = "/api/users/delete_address";
const BASE_URL4 = "/api/users/card";
const BASE_URL5 = "/api/users/update_card";
const BASE_URL6 = "/api/users/delete_card";
const BASE_URL7 = "/api/users/order";

export async function createUser(partialUser: UserFormInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL, partialUser);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create user n'a pas fonctionné " + response.data.error);
  }
}
export async function createOrder(partialUser: UserOrderInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL7, partialUser);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create order n'a pas fonctionné " + response.data.error);
  }
}

export async function createAddress(partialUser: UserAddressInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL1, partialUser);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create adresse n'a pas fonctionné " + response.data.error);
  }
}

export async function updateAddress(partialUser: UserAddressInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL2, partialUser);

  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create adresse n'a pas fonctionné " + response.data.error);
  }
}
export async function deleteAddress(partialUser: UserAddressInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL3, partialUser);

  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create adresse n'a pas fonctionné " + response.data.error);
  }
}

export async function createCard(partialUser: UserCardInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL4, partialUser);

  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create adresse n'a pas fonctionné " + response.data.error);
  }
}
export async function updateCard(partialUser: UserCardInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL5, partialUser);

  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Update card n'a pas fonctionné " + response.data.error);
  }
}
export async function deleteCard(partialUser: UserCardInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL6, partialUser);

  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Delete Card n'a pas fonctionné " + response.data.error);
  }
}

export async function fetchCurrentUser(): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL);
  if (!response.data?.error) {
    return response.data;
    // return {"Erreur dans Fetch Current User " + response.data.local.email}
  } else {
    throw new Error("Erreur dans Fetch Current User " + response.data.local.email);
  }
}
