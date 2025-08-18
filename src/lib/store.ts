import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  description: string;
  cover: string;
  price: number;
  duration: string;
  genre: string;
  rating: number;
  reviews: number;
  sample: string;
  publishedDate: string;
  featured?: boolean;
}

export interface CartItem {
  audiobook: Audiobook;
  quantity: number;
}

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          avatar: "https://avatar.iran.liara.run/public/boy",
        };
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      register: async (email: string, password: string, name: string) => {
        // Mock registration
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          avatar: "https://avatar.iran.liara.run/public/girl",
        };
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-store",
    }
  )
);

// Cart Store
interface CartState {
  items: CartItem[];
  total: number;
  addItem: (audiobook: Audiobook) => void;
  removeItem: (audiobookId: string) => void;
  updateQuantity: (audiobookId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (audiobook) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.audiobook.id === audiobook.id
        );

        if (existingItem) {
          get().updateQuantity(audiobook.id, existingItem.quantity + 1);
        } else {
          const newItems = [...items, { audiobook, quantity: 1 }];
          const total = newItems.reduce(
            (sum, item) => sum + item.audiobook.price * item.quantity,
            0
          );
          set({ items: newItems, total });
        }
      },
      removeItem: (audiobookId) => {
        const items = get().items.filter(
          (item) => item.audiobook.id !== audiobookId
        );
        const total = items.reduce(
          (sum, item) => sum + item.audiobook.price * item.quantity,
          0
        );
        set({ items, total });
      },
      updateQuantity: (audiobookId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(audiobookId);
          return;
        }

        const items = get().items.map((item) =>
          item.audiobook.id === audiobookId ? { ...item, quantity } : item
        );
        const total = items.reduce(
          (sum, item) => sum + item.audiobook.price * item.quantity,
          0
        );
        set({ items, total });
      },
      clearCart: () => {
        set({ items: [], total: 0 });
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-store",
    }
  )
);

// App Store for UI state
interface AppState {
  searchQuery: string;
  selectedGenre: string;
  sortBy: "title" | "price" | "rating" | "newest";
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSortBy: (sort: "title" | "price" | "rating" | "newest") => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  selectedGenre: "",
  sortBy: "newest",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSortBy: (sort) => set({ sortBy: sort }),
}));
