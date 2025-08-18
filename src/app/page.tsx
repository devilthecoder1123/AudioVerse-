"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AudioBookCard } from "@/components/audiobook/AudioBookCard";
import { audiobooks, getFeaturedBooks } from "@/audiobookdata/audiobookdata";
import { Headphones, Star, Users, Zap } from "lucide-react";

export default function Home() {
  const featuredBooks = getFeaturedBooks();
  const popularBooks = audiobooks.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Headphones className="h-16 w-16 text-primary" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              AudioVerse
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Immerse yourself in premium audiobooks narrated by world-class
              storytellers. Your gateway to infinite worlds of imagination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books">
                <Button
                  variant="primary"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  <Headphones className="mr-2 h-5 w-5" />
                  Start Listening
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Join Free
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              {[
                { icon: Star, label: "5-Star Rating", value: "4.9" },
                { icon: Users, label: "Happy Listeners", value: "50K+" },
                { icon: Zap, label: "Hours Streamed", value: "1M+" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Featured Audiobooks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our hand-picked selection of extraordinary stories that
              captivate and inspire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AudioBookCard audiobook={book} featured />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular This Week */}
      <section className="py-16 px-4 card-subtle">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular This Week
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what other listeners are enjoying right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AudioBookCard audiobook={book} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/books">
              <Button variant="primary" size="lg">
                View All Books
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-6">
              Ready to Begin Your Audio Journey?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of listeners who have discovered their next
              favorite story with AudioVerse.
            </p>

            <Link href="/register">
              <Button variant="primary" size="xl">
                Start Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
