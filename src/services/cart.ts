// Shopping cart with authentication requirements
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Audiobook } from "../audiobookdata/audiobook-data";

export interface CartItem {
  audiobook: Audiobook;
  quantity: number;
  addedAt: Date;
}

interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;

  // Actions
  addItem: (audiobook: Audiobook) => { success: boolean; error?: string };
  removeItem: (audiobookId: string) => void;
  updateQuantity: (audiobookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  // Getters
  getItemCount: () => number;
  getItemById: (audiobookId: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isOpen: false,

      addItem: (audiobook: Audiobook) => {
        // Authentication check is now handled in the useCart hook
        // This allows for better separation of concerns

        const items = get().items;
        const existingItem = items.find(
          (item) => item.audiobook.id === audiobook.id
        );

        if (existingItem) {
          get().updateQuantity(audiobook.id, existingItem.quantity + 1);
        } else {
          const newItem: CartItem = {
            audiobook,
            quantity: 1,
            addedAt: new Date(),
          };
          const newItems = [...items, newItem];
          const total = newItems.reduce(
            (sum, item) => sum + item.audiobook.price * item.quantity,
            0
          );
          set({ items: newItems, total });
        }

        return { success: true };
      },

      removeItem: (audiobookId: string) => {
        const items = get().items.filter(
          (item) => item.audiobook.id !== audiobookId
        );
        const total = items.reduce(
          (sum, item) => sum + item.audiobook.price * item.quantity,
          0
        );
        set({ items, total });
      },

      updateQuantity: (audiobookId: string, quantity: number) => {
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

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemById: (audiobookId: string) => {
        return get().items.find((item) => item.audiobook.id === audiobookId);
      },
    }),
    {
      name: "cart-storage",
      version: 1,
    }
  )
);
