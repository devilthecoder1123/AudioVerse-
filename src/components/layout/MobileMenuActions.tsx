import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { User as UserType } from "@/services/auth";

interface MobileMenuActionsProps {
  user: UserType | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  onClose: () => void;
}

export function MobileMenuActions({ 
  user, 
  isAuthenticated, 
  onLogout, 
  onClose 
}: MobileMenuActionsProps) {
  const handleLogout = () => {
    onLogout();
    onClose();
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="px-3 py-2 text-sm text-muted-foreground border-t border-border/50 mt-4">
          {user?.name}
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <div className="space-y-2 pt-4 border-t border-border/50">
      <Link href="/login" onClick={onClose}>
        <Button variant="ghost" className="w-full">
          Login
        </Button>
      </Link>
      <Link href="/register" onClick={onClose}>
        <Button variant="primary" className="w-full">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
