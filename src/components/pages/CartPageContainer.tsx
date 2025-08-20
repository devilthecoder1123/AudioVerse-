"use client";

import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/useToast";
import { CartPagePresentation } from "./CartPagePresentation";

/**
 * Container component for Cart page that handles business logic
 */
export function CartPageContainer() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (audiobookId: string, newQuantity: number) => {
    updateQuantity(audiobookId, newQuantity);
  };

  const handleRemoveItem = (audiobookId: string, title: string) => {
    removeItem(audiobookId);
    toast({
      title: "Removed from cart",
      description: `${title} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality would be implemented here.",
    });
  };

  return (
    <CartPagePresentation
      items={items}
      total={total}
      onQuantityChange={handleQuantityChange}
      onRemoveItem={handleRemoveItem}
      onClearCart={handleClearCart}
      onCheckout={handleCheckout}
    />
  );
}
