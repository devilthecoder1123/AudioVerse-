import { useCallback } from 'react';
import { useAuthStore } from '@/services/auth';
import type { User } from '@/services/auth';

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
}

/**
 * Custom hook for authentication operations
 * Encapsulates auth business logic and provides a clean API
 */
export function useAuth(): UseAuthReturn {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginStore,
    loginWithGoogle: loginWithGoogleStore,
    register: registerStore,
    logout: logoutStore,
    clearError,
  } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    return await loginStore(email, password);
  }, [loginStore]);

  const loginWithGoogle = useCallback(async () => {
    return await loginWithGoogleStore();
  }, [loginWithGoogleStore]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    return await registerStore(email, password, name);
  }, [registerStore]);

  const logout = useCallback(() => {
    logoutStore();
  }, [logoutStore]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    clearError,
  };
}
