import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center py-16 animate-fade-in-up">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6 opacity-50" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Discover amazing audiobooks and add them to your cart to get started.
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
