import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, User, Mic } from "lucide-react";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface BookInfoProps {
  book: Audiobook;
}

export function BookInfo({ book }: BookInfoProps) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="space-y-6">
        {/* Title and Author */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gradient-premium">
            {book.title}
          </h1>
          <div className="flex items-center space-x-4 text-lg text-muted-foreground mb-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>by {book.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5" />
              <span>Narrated by {book.narrator}</span>
            </div>
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book.rating)
                      ? "text-accent fill-current"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{book.rating}</span>
            <span className="text-muted-foreground">(2,847 reviews)</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{book.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Published 2023</span>
          </div>
          <Badge variant="secondary" className="w-fit">
            {book.genre}
          </Badge>
        </div>

        {/* Price */}
        <div className="text-3xl font-bold text-primary">
          ${book.price}
        </div>
      </div>
    </div>
  );
}
