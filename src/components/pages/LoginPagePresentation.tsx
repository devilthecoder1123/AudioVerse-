import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { FormField } from "@/components/forms/FormField";
import { Mail, Lock } from "lucide-react";

interface LoginPagePresentationProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onShowPasswordToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

/**
 * Pure presentation component for Login page
 * Contains only UI logic, no business logic
 */
export function LoginPagePresentation({
  email,
  password,
  showPassword,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onShowPasswordToggle,
  onSubmit,
  onGoogleLogin,
}: LoginPagePresentationProps) {
  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to your account to continue your audiobook journey"
      onGoogleAuth={onGoogleLogin}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      submitButtonText="Sign in"
      footerText="Don't have an account?"
      footerLink={
        <Link
          href="/register"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Sign up
        </Link>
      }
    >
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={onEmailChange}
        icon={<Mail />}
        required
        disabled={isLoading}
      />

      <FormField
        id="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={onPasswordChange}
        icon={<Lock />}
        showPasswordToggle
        showPassword={showPassword}
        onPasswordToggle={onShowPasswordToggle}
        required
        disabled={isLoading}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </AuthForm>
  );
}
