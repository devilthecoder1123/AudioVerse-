import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./useCart";
import { useAuth } from "./useAuth";
import { toast } from "./useToast";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

export function useBookDetail(book: Audiobook | null) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!book) return;
    
    const result = await addItem(book);
    if (result.success) {
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Login required",
        description: result.error || "Please log in to add books to your cart.",
        variant: "destructive",
      });
      router.push("/login");
    }
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
      description: `${book?.title} has been ${
        isFavorited ? "removed from" : "added to"
      } your favorites.`,
    });
  };

  return {
    isPlaying,
    isFavorited,
    handleAddToCart,
    handlePlaySample,
    handleFavorite,
  };
}
