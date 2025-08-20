import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "../providers/providers";

export const metadata: Metadata = {
  title: "My Book Store",
  description: "Bookstore app built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background" suppressHydrationWarning>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Header />
            <main>{children}</main>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
