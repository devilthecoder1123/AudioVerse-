import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

interface BookActionsProps {
  isFavorited: boolean;
  onAddToCart: () => void;
  onFavorite: () => void;
}

export function BookActions({ isFavorited, onAddToCart, onFavorite }: BookActionsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this audiobook!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onAddToCart}
          className="btn-premium flex-1 px-8 py-4 text-lg"
        >
          <ShoppingCart className="h-5 w-5 mr-3" />
          Add to Cart
        </Button>
        
        <Button
          variant="outline"
          onClick={onFavorite}
          className="px-6 py-4"
        >
          <Heart 
            className={`h-5 w-5 mr-2 ${isFavorited ? "fill-current text-red-500" : ""}`} 
          />
          {isFavorited ? "Favorited" : "Add to Favorites"}
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={handleShare} className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
