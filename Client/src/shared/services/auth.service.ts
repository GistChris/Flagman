import type { SigninFormInterface, UserInterface } from "@/interfaces";
import axios from "axios";

const BASE_URL = "/api/auth";

export async function signIn(data: SigninFormInterface): Promise<UserInterface> {
  const response = await axios.post(BASE_URL, data);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Erreur dans sign-in");
  }
}

export async function signOut(): Promise<void> {
  await axios.delete(BASE_URL);
}
