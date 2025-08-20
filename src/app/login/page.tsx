"use client";

import { LoginPageContainer } from "@/components/pages/LoginPageContainer";
import { PublicRoute } from "@/components/auth/PublicRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginPageContainer />
    </PublicRoute>
  );
}
