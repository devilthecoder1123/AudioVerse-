"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Pause, ShoppingCart, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/services/cart";
import { toast } from "@/hooks/use-toast";
import { Audiobook } from "@/audiobookdata/audiobookdata"; // ✅ fixed path for Next.js

interface AudiobookCardProps {
  audiobook: Audiobook;
  featured?: boolean;
}

export function AudioBookCard({
  audiobook,
  featured = false,
}: AudiobookCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { addItem } = useCartStore();
  //   const { isAuthenticated } = useAuthStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = addItem(audiobook, true);
    if (result.success) {
      toast({
        title: "Added to cart",
        description: `${audiobook.title} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Login required",
        description: result.error || "Please log in to add items to your cart.",
        variant: "destructive",
      });
    }
  };

  const handlePlaySample = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const imageHeight = featured ? "h-64" : "h-48";

  return (
    <Link href={`/books/${audiobook.id}`} className="group">
      <Card
        className={`card-subtle hover:shadow-lg transition-all duration-300 hover:scale-105 ${
          featured ? "border-primary/30" : "border-border/30"
        } overflow-hidden animate-fade-in`}
      >
        <div className="relative">
          {/* Cover / Title */}
          <div
            className={`${imageHeight} bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-muted/60 flex items-center justify-center p-4">
              <div className="text-center">
                <h3
                  className={`font-bold text-foreground line-clamp-2 ${
                    featured ? "text-xl" : "text-lg"
                  }`}
                >
                  {audiobook.title}
                </h3>
                <p
                  className={`text-muted-foreground mt-2 ${
                    featured ? "text-base" : "text-sm"
                  }`}
                >
                  {audiobook.author}
                </p>
              </div>
            </div>

            {/* Hover play button */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="icon"
                onClick={handlePlaySample}
                className="h-12 w-12 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
            </div>

            {audiobook.featured && (
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}

            {/* Fake audio visualizer */}
            {isPlaying && (
              <div className="absolute bottom-2 left-2 opacity-80">
                <div className="flex items-end space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{ height: `${15 + (i % 3) * 10}px` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3
                className={`font-semibold line-clamp-1 ${
                  featured ? "text-lg" : "text-base"
                }`}
              >
                {audiobook.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                by {audiobook.author}
              </p>
              <p className="text-xs text-muted-foreground">
                Narrated by {audiobook.narrator}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-accent fill-current" />
                    <span className="text-xs text-muted-foreground">
                      {audiobook.rating}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {audiobook.duration}
                    </span>
                  </div>
                </div>

                <Badge variant="secondary" className="text-xs">
                  {audiobook.genre}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span
                  className={`font-bold text-primary ${
                    featured ? "text-lg" : "text-base"
                  }`}
                >
                  ${audiobook.price}
                </span>

                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleAddToCart}
                  className="shrink-0"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
