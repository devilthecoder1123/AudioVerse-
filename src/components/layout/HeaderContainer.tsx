"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { HeaderPresentation } from "./HeaderPresentation";

/**
 * Container component for Header that handles business logic
 */
export function HeaderContainer() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleNavigateToCart = () => {
    router.push("/cart");
  };

  return (
    <HeaderPresentation
      user={user}
      isAuthenticated={isAuthenticated}
      cartItemCount={itemCount}
      onLogout={handleLogout}
      onNavigateToCart={handleNavigateToCart}
    />
  );
}
