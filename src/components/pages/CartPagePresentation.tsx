import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/forms/PageHeader";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartItem } from "@/components/cart/CartItem";
import { OrderSummary } from "@/components/cart/OrderSummary";
import type { CartItem as CartItemType } from "@/services/cart";

interface CartPagePresentationProps {
  items: CartItemType[];
  total: number;
  onQuantityChange: (audiobookId: string, newQuantity: number) => void;
  onRemoveItem: (audiobookId: string, title: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

/**
 * Pure presentation component for Cart page
 * Contains only UI logic, no business logic
 */
export function CartPagePresentation({
  items,
  total,
  onQuantityChange,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartPagePresentationProps) {
  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <PageHeader
          title="Shopping Cart"
          subtitle={`${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>

            {items.map((item, index) => (
              <Card
                key={item.audiobook.id}
                className="glass-effect border-primary/20"
              >
                <CardContent className="p-6">
                  <CartItem
                    item={item}
                    index={index}
                    onQuantityChange={onQuantityChange}
                    onRemoveItem={onRemoveItem}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              total={total}
              onCheckout={onCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
