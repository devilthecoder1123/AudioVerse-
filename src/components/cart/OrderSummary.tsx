import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/services/cart";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  onCheckout: () => void;
}

export function OrderSummary({ items, total, onCheckout }: OrderSummaryProps) {
  return (
    <Card
      className="glass-effect border-primary/20 sticky top-24 animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
    >
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.audiobook.id} className="flex justify-between text-sm">
              <span className="line-clamp-1 mr-2">
                {item.audiobook.title} × {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.audiobook.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-3 pt-4">
          <Button variant="primary" className="w-full" onClick={onCheckout}>
            Proceed to Checkout
          </Button>

          <Link href="/books" className="block">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
          ✓ Secure checkout
          <br />
          ✓ 30-day money-back guarantee
          <br />✓ Download immediately after purchase
        </div>
      </CardContent>
    </Card>
  );
}
