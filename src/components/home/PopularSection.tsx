"use client";

import { AudioBookCard } from "@/components/audiobook/AudioBookCard";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface PopularSectionProps {
  audiobooks: Audiobook[];
}

export function PopularSection({ audiobooks }: PopularSectionProps) {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-premium">Most Popular</span> Right Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join millions of listeners enjoying these trending audiobooks. See what everyone&apos;s talking about.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiobooks.slice(6, 14).map((book, index) => (
            <div 
              key={book.id} 
              className="animate-fade-in-up glow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AudioBookCard audiobook={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
