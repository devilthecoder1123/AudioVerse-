"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AudioBookCard } from "@/components/audiobook/AudioBookCard";
import { TrendingUp } from "lucide-react";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface FeaturedSectionProps {
  audiobooks: Audiobook[];
}

export function FeaturedSection({ audiobooks }: FeaturedSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-premium">Featured</span> This Week
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked selections from our curators. These stories are capturing hearts and minds worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiobooks.slice(0, 6).map((book, index) => (
            <div 
              key={book.id} 
              className="animate-fade-in-up glow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AudioBookCard audiobook={book} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/books">
            <Button className="btn-premium px-8 py-4 text-lg">
              <TrendingUp className="w-5 h-5 mr-3" />
              Explore All Books
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
