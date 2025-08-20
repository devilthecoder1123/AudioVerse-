import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderNavigation } from "./HeaderNavigation";
import { MobileMenu } from "./MobileMenu";
import type { User as UserType } from "@/services/auth";

interface HeaderPresentationProps {
  user: UserType | null;
  isAuthenticated: boolean;
  cartItemCount: number;
  onLogout: () => void;
  onNavigateToCart: () => void;
}

export function HeaderPresentation({
  user,
  isAuthenticated,
  cartItemCount,
  onLogout,
  onNavigateToCart,
}: HeaderPresentationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-[100] bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <HeaderLogo />
          
          {/* Only show search when authenticated */}
          {isAuthenticated && <HeaderSearch />}
          
          <HeaderNavigation
            user={user}
            isAuthenticated={isAuthenticated}
            cartItemCount={cartItemCount}
            onLogout={handleLogout}
            onNavigateToCart={onNavigateToCart}
          />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <MobileMenu
            user={user}
            isAuthenticated={isAuthenticated}
            cartItemCount={cartItemCount}
            onLogout={handleLogout}
            onNavigateToCart={onNavigateToCart}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
