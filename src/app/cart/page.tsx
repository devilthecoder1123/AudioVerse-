"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } =
    useCartStore();

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-16 animate-fade-in-up">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Discover amazing audiobooks and add them to your cart to get
              started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books">
                <Button variant="primary" size="lg">
                  Browse Audiobooks
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>

            {items.map((item, index) => (
              <Card
                key={item.audiobook.id}
                className="glass-effect border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Book Cover */}
                    <div className="w-full sm:w-32 h-40 sm:h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-center p-2">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.audiobook.title}
                        </h4>
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="space-y-2">
                          <Link
                            href={`/books/${item.audiobook.id}`}
                            className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.audiobook.title}
                          </Link>
                          <p className="text-muted-foreground">
                            by {item.audiobook.author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Narrated by {item.audiobook.narrator}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.audiobook.genre}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.audiobook.duration}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-4">
                          <p className="text-lg font-bold text-primary">
                            ${item.audiobook.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(
                                  item.audiobook.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(
                                  item.audiobook.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveItem(
                                item.audiobook.id,
                                item.audiobook.title
                              )
                            }
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
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
                    <div
                      key={item.audiobook.id}
                      className="flex justify-between text-sm"
                    >
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
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleCheckout}
                  >
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
          </div>
        </div>
      </div>
    </div>
  );
}
