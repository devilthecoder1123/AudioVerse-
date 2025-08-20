"use client";

import { CartPageContainer } from "@/components/pages/CartPageContainer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartPageContainer />
    </ProtectedRoute>
  );
}
