import Link from "next/link";
import { Headphones } from "lucide-react";

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Headphones className="h-8 w-8 text-primary transition-colors" />
      <span className="text-xl font-bold text-gradient hidden sm:block">
        AudioVerse
      </span>
    </Link>
  );
}
