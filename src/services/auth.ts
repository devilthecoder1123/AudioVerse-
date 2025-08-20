// Authentication service with Google OAuth support
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "email" | "google";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
}

// Mock Google OAuth - In production, replace with actual Google OAuth implementation
const mockGoogleAuth = async (): Promise<User> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock successful Google authentication
  return {
    id: `google_${Date.now()}`,
    email: "user@gmail.com",
    name: "John Doe",
    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    provider: "google",
  };
};

// Mock email authentication
const mockEmailAuth = async (
  email: string,
  password: string
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple validation
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  return {
    id: `email_${Date.now()}`,
    email,
    name: email.split("@")[0],
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      email.split("@")[0]
    )}&background=6366f1&color=fff`,
    provider: "email",
  };
};

const mockRegister = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Simple validation
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (name.length < 2) {
    throw new Error("Name must be at least 2 characters");
  }

  return {
    id: `email_${Date.now()}`,
    email,
    name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6366f1&color=fff`,
    provider: "email",
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await mockEmailAuth(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });

        try {
          const user = await mockGoogleAuth();
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Google login failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await mockRegister(email, password, name);
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
