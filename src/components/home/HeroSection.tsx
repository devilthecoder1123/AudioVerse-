"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, BookOpen, Headphones } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative hero-bg py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Audiobook Experience
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gradient-premium">AudioVerse</span>
                <br />
                <span className="text-foreground">Where Stories</span>
                <br />
                <span className="text-foreground">Come Alive</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Immerse yourself in premium narrated stories. From bestselling novels to exclusive originals, 
                discover your next obsession with crystal-clear audio and expert storytelling.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/books">
                <Button className="btn-premium px-8 py-6 text-lg font-semibold">
                  <Play className="w-5 h-5 mr-3" />
                  Start Listening
                </Button>
              </Link>
              <Link href="/books">
                <Button variant="outline" className="px-8 py-6 text-lg border-border/50 hover:border-primary/50">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Browse Library
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Audiobooks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1M+</div>
                <div className="text-sm text-muted-foreground">Happy Listeners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">4.9★</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Audio Player Mockup */}
          <div className="relative animate-fade-in-up">
            <div className="glass-card p-8 animate-float">
              <AudioPlayerMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
}

function AudioPlayerMockup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
          <Headphones className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Now Playing</h3>
          <p className="text-muted-foreground">The Midnight Library</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Chapter 3: The Life She Wanted</span>
          <span>12:34 / 45:22</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-1/3"></div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </Button>
        <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent">
          <Play className="w-8 h-8" />
        </Button>
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
