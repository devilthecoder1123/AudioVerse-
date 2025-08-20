import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { FormField } from "@/components/forms/FormField";
import { NameFields } from "@/components/forms/NameFields";
import { PasswordFields } from "@/components/forms/PasswordFields";
import { TermsCheckbox } from "@/components/forms/TermsCheckbox";
import { Mail } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterPagePresentationProps {
  formData: FormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  acceptTerms: boolean;
  isLoading: boolean;
  error: string | null;
  onInputChange: (field: string, value: string) => void;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
  onAcceptTermsChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleRegister: () => void;
}

export function RegisterPagePresentation({
  formData,
  showPassword,
  showConfirmPassword,
  acceptTerms,
  isLoading,
  error,
  onInputChange,
  onShowPasswordToggle,
  onShowConfirmPasswordToggle,
  onAcceptTermsChange,
  onSubmit,
  onGoogleRegister,
}: RegisterPagePresentationProps) {
  return (
    <AuthForm
      title="Join AudioBook Nexus"
      subtitle="Create your account and start your audiobook journey today"
      onGoogleAuth={onGoogleRegister}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      submitButtonText="Create Account"
      footerText="Already have an account?"
      footerLink={
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Sign in
        </Link>
      }
    >
      <NameFields
        firstName={formData.firstName}
        lastName={formData.lastName}
        onInputChange={onInputChange}
        isLoading={isLoading}
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(value) => onInputChange("email", value)}
        icon={<Mail />}
        required
        disabled={isLoading}
      />

      <PasswordFields
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onInputChange={onInputChange}
        onShowPasswordToggle={onShowPasswordToggle}
        onShowConfirmPasswordToggle={onShowConfirmPasswordToggle}
        isLoading={isLoading}
      />

      <TermsCheckbox
        acceptTerms={acceptTerms}
        onAcceptTermsChange={onAcceptTermsChange}
        isLoading={isLoading}
      />
    </AuthForm>
  );
}
