import Link from "next/link";
import { User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as UserType } from "@/services/auth";

interface HeaderUserMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function HeaderUserMenu({ user, isAuthenticated, onLogout }: HeaderUserMenuProps) {
  if (isAuthenticated) {
    const initials = user?.name
      ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-muted/50 transition-colors">
            <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-lg">
              <AvatarImage 
                src={user?.avatar} 
                alt={user?.name || 'User'} 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary via-primary/80 to-accent text-primary-foreground font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2">
          <div className="flex items-center space-x-3 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link href="/login">
        <Button 
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
          size="sm"
        >
          <User className="w-4 h-4 mr-2" />
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button 
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
          size="sm"
        >
          <User className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
