import { useUser } from "@/stores/userStore";

export function isAuthenticatedGuard() {
  const userStore = useUser();
  if (!userStore.isAuthenticated) {
    return "/signIn";
  }
}

export function isNotAuthenticatedGuard() {
  const userStore = useUser();
  if (userStore.isAuthenticated) return "/profile";
}
