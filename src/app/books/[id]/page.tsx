"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAudiobook } from "@/hooks/useAudiobooks";
import { useBookDetail } from "@/hooks/useBookDetail";
import { BookDetailHeader } from "@/components/book-detail/BookDetailHeader";
import { BookCover } from "@/components/book-detail/BookCover";
import { BookInfo } from "@/components/book-detail/BookInfo";
import { BookActions } from "@/components/book-detail/BookActions";
import { BookDescription } from "@/components/book-detail/BookDescription";
import { RelatedBooks } from "@/components/book-detail/RelatedBooks";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function BookDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { audiobook: book, relatedBooks } = useAudiobook(id);
  const { 
    isPlaying, 
    isFavorited, 
    handleAddToCart, 
    handlePlaySample, 
    handleFavorite 
  } = useBookDetail(book || null);

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

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <BookDetailHeader />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <BookCover 
              book={book} 
              isPlaying={isPlaying} 
              onPlaySample={handlePlaySample} 
            />

            <div className="space-y-8">
              <BookInfo book={book} />
              <BookActions 
                isFavorited={isFavorited}
                onAddToCart={handleAddToCart}
                onFavorite={handleFavorite}
              />
            </div>
          </div>

          <BookDescription book={book} />
          <RelatedBooks relatedBooks={relatedBooks} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
