"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockAudiobooks } from "@/lib/data";
import { useCartStore, useAuthStore } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import {
  Play,
  Pause,
  ShoppingCart,
  Star,
  Clock,
  Calendar,
  User,
  Mic,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const id = params?.id as string;
  const book = mockAudiobooks.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Link href="/books">
            <Button variant="primary">Browse Books</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to add books to your cart.",
        variant: "destructive",
      });
      router.push("/books");
      return;
    }

    addItem(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handlePlaySample = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to save favorites.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${book.title} has been ${
        isFavorited ? "removed from" : "added to"
      } your favorites.`,
    });
  };

  const relatedBooks = mockAudiobooks
    .filter(
      (b) =>
        b.id !== book.id && (b.genre === book.genre || b.author === book.author)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Book Cover & Audio Player */}
          <div className="animate-fade-in-up">
            <Card className="glass-effect border-primary/20 overflow-hidden">
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                  {/* Mock book cover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-muted/60 flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {book.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handlePlaySample}
                      className="h-16 w-16"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </Button>
                  </div>

                  {/* Audio visualizer when playing */}
                  {isPlaying && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 bg-primary rounded-full animate-audio-wave"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            height: "30px",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Featured badge */}
                  {book.featured && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Audio Controls */}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Free Sample Available
                      </p>
                      <Button
                        variant={isPlaying ? "secondary" : "primary"}
                        onClick={handlePlaySample}
                        className="w-full"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Stop Sample
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Play Sample
                          </>
                        )}
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleFavorite}
                        className={isFavorited ? "text-red-500" : ""}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isFavorited ? "fill-current" : ""
                          }`}
                        />
                      </Button>

                      <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Book Details */}
          <div
            className="space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                {book.genre}
              </Badge>
              <h1 className="text-4xl font-bold text-gradient mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                by {book.author}
              </p>
              <p className="text-lg text-muted-foreground">
                Narrated by {book.narrator}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-accent fill-current" />
                <span className="font-medium">{book.rating}</span>
                <span className="text-muted-foreground">
                  ({book.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{book.duration}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{new Date(book.publishedDate).getFullYear()}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                About this audiobook
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Credits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 glass-effect rounded-lg">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Author</p>
                  <p className="font-medium">{book.author}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 glass-effect rounded-lg">
                <Mic className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Narrator</p>
                  <p className="font-medium">{book.narrator}</p>
                </div>
              </div>
            </div>

            {/* Purchase */}
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      ${book.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      One-time purchase
                    </p>
                  </div>

                  <Button
                    variant="accent"
                    size="lg"
                    onClick={handleAddToCart}
                    className="shrink-0"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  ✓ Download and keep forever
                  <br />
                  ✓ Play on any device
                  <br />✓ 30-day money-back guarantee
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-2xl font-bold mb-8">
              More from{" "}
              {book.genre === relatedBooks[0]?.genre
                ? `${book.genre}`
                : `${book.author}`}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook, index) => (
                <Link
                  key={relatedBook.id}
                  href={`/books/${relatedBook.id}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <Card className="glass-effect hover:shadow-accent/20 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center p-4">
                        <h4 className="font-semibold text-sm line-clamp-2">
                          {relatedBook.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-2">
                          {relatedBook.author}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-primary">
                          ${relatedBook.price}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-accent fill-current" />
                          <span className="text-xs">{relatedBook.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
