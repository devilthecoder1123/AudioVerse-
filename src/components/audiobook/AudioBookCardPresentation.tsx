import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AudioBookCardCover } from "./AudioBookCardCover";
import { AudioBookCardInfo } from "./AudioBookCardInfo";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface AudioBookCardPresentationProps {
  audiobook: Audiobook;
  featured?: boolean;
  isPlaying: boolean;
  onPlaySample: (e: React.MouseEvent) => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

/**
 * Pure presentation component for AudioBook card
 * Contains only UI logic, no business logic
 */
export function AudioBookCardPresentation({
  audiobook,
  featured = false,
  isPlaying,
  onPlaySample,
  onAddToCart,
}: AudioBookCardPresentationProps) {
  return (
    <Link href={`/books/${audiobook.id}`} className="group">
      <Card
        className={`card-subtle hover:shadow-lg transition-all duration-300 hover:scale-105 ${
          featured ? "border-primary/30" : "border-border/30"
        } overflow-hidden animate-fade-in`}
      >
        <div className="relative">
          <AudioBookCardCover
            audiobook={audiobook}
            featured={featured}
            isPlaying={isPlaying}
            onPlaySample={onPlaySample}
          />

          <CardContent className="p-4">
            <AudioBookCardInfo audiobook={audiobook} featured={featured} />

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
                onClick={onAddToCart}
                className="shrink-0"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
