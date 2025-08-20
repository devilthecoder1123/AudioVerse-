"use client";

import { BooksPageContainer } from "@/components/pages/BooksPageContainer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Books() {
  return (
    <ProtectedRoute>
      <BooksPageContainer />
    </ProtectedRoute>
  );
}
