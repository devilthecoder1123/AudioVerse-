import { FormField } from "./FormField";
import { Lock } from "lucide-react";

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (field: string, value: string) => void;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
  isLoading: boolean;
}

export function PasswordFields({
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onShowPasswordToggle,
  onShowConfirmPasswordToggle,
  isLoading,
}: PasswordFieldsProps) {
  return (
    <>
      <FormField
        id="password"
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={(value) => onInputChange("password", value)}
        icon={<Lock />}
        showPasswordToggle
        showPassword={showPassword}
        onPasswordToggle={onShowPasswordToggle}
        required
        disabled={isLoading}
      />

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(value) => onInputChange("confirmPassword", value)}
        icon={<Lock />}
        showPasswordToggle
        showPassword={showConfirmPassword}
        onPasswordToggle={onShowConfirmPasswordToggle}
        required
        disabled={isLoading}
      />
    </>
  );
}
