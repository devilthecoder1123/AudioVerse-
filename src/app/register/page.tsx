"use client";

import { RegisterPageContainer } from "@/components/pages/RegisterPageContainer";
import { PublicRoute } from "@/components/auth/PublicRoute";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <RegisterPageContainer />
    </PublicRoute>
  );
}
