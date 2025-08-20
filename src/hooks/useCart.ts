import { useCallback, useEffect, useState } from 'react';
import { useCartStore, type CartItem } from '@/services/cart';
import { useAuth } from '@/hooks/useAuth';
import type { Audiobook } from '@/audiobookdata/audiobook-data';

export interface UseCartReturn {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
  addItem: (audiobook: Audiobook) => Promise<{ success: boolean; error?: string }>;
  removeItem: (audiobookId: string) => void;
  updateQuantity: (audiobookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getItemById: (audiobookId: string) => CartItem | undefined;
}

/**
 * Custom hook for cart operations
 * Encapsulates cart business logic and provides a clean API
 */
export function useCart(): UseCartReturn {
  const {
    items,
    total,
    isOpen,
    addItem: addItemToStore,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    getItemCount,
    getItemById,
  } = useCartStore();

  const { isAuthenticated } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  // Prevent hydration mismatch by only showing cart count after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const addItem = useCallback(async (audiobook: Audiobook) => {
    if (!isAuthenticated) {
      return {
        success: false,
        error: 'Please log in to add items to your cart',
      };
    }

    const result = addItemToStore(audiobook);
    return result;
  }, [isAuthenticated, addItemToStore]);

  // Only calculate item count after hydration to prevent server/client mismatch
  const itemCount = isHydrated ? getItemCount() : 0;

  return {
    items,
    total,
    itemCount,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    getItemById,
  };
}
