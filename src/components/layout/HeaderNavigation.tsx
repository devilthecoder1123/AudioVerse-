import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderUserMenu } from "./HeaderUserMenu";
import type { User as UserType } from "@/services/auth";

interface HeaderNavigationProps {
  user: UserType | null;
  isAuthenticated: boolean;
  cartItemCount: number;
  onLogout: () => void;
  onNavigateToCart: () => void;
}

export function HeaderNavigation({
  user,
  isAuthenticated,
  cartItemCount,
  onLogout,
  onNavigateToCart,
}: HeaderNavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {/* Only show Browse and Cart when authenticated */}
      {isAuthenticated && (
        <>
          <Link href="/books">
            <Button variant="ghost">Browse</Button>
          </Link>

          {/* Cart */}
          <Button variant="ghost" className="relative" onClick={onNavigateToCart}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </>
      )}

      <HeaderUserMenu 
        user={user} 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout} 
      />
    </nav>
  );
}
