"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services/auth";
import { toast } from "@/hooks/useToast";
import { LoginPagePresentation } from "./LoginPagePresentation";

/**
 * Container component for Login page that handles business logic
 */
export function LoginPageContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, loginWithGoogle, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const result = await login(email, password);
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      router.push("/books");
    } else {
      toast({
        title: "Login failed",
        description: result.error || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    const result = await loginWithGoogle();
    if (result.success) {
      toast({
        title: "Welcome!",
        description: "You've successfully logged in with Google.",
      });
      router.push("/books");
    } else {
      toast({
        title: "Google login failed",
        description: result.error || "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <LoginPagePresentation
      email={email}
      password={password}
      showPassword={showPassword}
      isLoading={isLoading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onShowPasswordToggle={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}
