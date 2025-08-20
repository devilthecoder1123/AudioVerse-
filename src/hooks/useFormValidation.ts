import { useState } from "react";
import { toast } from "./useToast";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormData {
  [key: string]: string;
}

export function useFormValidation<T extends FormData>(
  initialData: T,
  rules: ValidationRules
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name: string, value: string): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${name} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name} must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<T> = {};
    let formIsValid = true;

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName] || "");
      if (error) {
        newErrors[fieldName as keyof T] = error as T[keyof T];
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const updateField = (name: keyof T, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const showValidationError = (message: string) => {
    toast({
      title: "Validation Error",
      description: message,
      variant: "destructive",
    });
  };

  return {
    formData,
    errors,
    isValid,
    updateField,
    validateForm,
    validateField,
    showValidationError,
    setFormData,
  };
}
