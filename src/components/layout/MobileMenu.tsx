import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderSearch } from "./HeaderSearch";
import { MobileMenuActions } from "./MobileMenuActions";
import type { User as UserType } from "@/services/auth";

interface MobileMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  cartItemCount: number;
  onLogout: () => void;
  onNavigateToCart: () => void;
  onClose: () => void;
}

export function MobileMenu({ 
  user, 
  isAuthenticated, 
  cartItemCount, 
  onLogout, 
  onNavigateToCart, 
  onClose 
}: MobileMenuProps) {
  const handleCartClick = () => {
    onNavigateToCart();
    onClose();
  };

  return (
    <div className="md:hidden border-t border-border animate-slide-in py-4">
      {/* Only show search when authenticated */}
      {isAuthenticated && (
        <HeaderSearch 
          className="mb-4" 
          placeholder="Search audiobooks..." 
        />
      )}

      <nav className="space-y-2">
        {/* Only show Browse and Cart when authenticated */}
        {isAuthenticated && (
          <>
            <Link href="/books" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Browse Books
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cartItemCount})
            </Button>
          </>
        )}

        <MobileMenuActions
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          onClose={onClose}
        />
      </nav>
    </div>
  );
}
