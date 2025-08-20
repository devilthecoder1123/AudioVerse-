"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services/auth";
import { toast } from "@/hooks/useToast";
import { RegisterPagePresentation } from "./RegisterPagePresentation";

/**
 * Container component for Register page that handles business logic
 */
export function RegisterPageContainer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();
  const { register, loginWithGoogle, isLoading, error, clearError } = useAuthStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    const result = await register(
      formData.email,
      formData.password,
      `${formData.firstName} ${formData.lastName}`
    );

    if (result.success) {
      toast({
        title: "Welcome to AudioBook Nexus!",
        description: "Your account has been created successfully.",
      });
      router.push("/books");
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleRegister = async () => {
    clearError();
    const result = await loginWithGoogle();
    if (result.success) {
      toast({
        title: "Welcome to AudioBook Nexus!",
        description: "Your account has been created successfully with Google.",
      });
      router.push("/books");
    } else {
      toast({
        title: "Google registration failed",
        description: result.error || "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <RegisterPagePresentation
      formData={formData}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      acceptTerms={acceptTerms}
      isLoading={isLoading}
      error={error}
      onInputChange={handleInputChange}
      onShowPasswordToggle={() => setShowPassword(!showPassword)}
      onShowConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
      onAcceptTermsChange={setAcceptTerms}
      onSubmit={handleSubmit}
      onGoogleRegister={handleGoogleRegister}
    />
  );
}
