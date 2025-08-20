"use client";

import { useState, useCallback } from "react";
import { AudioBookCardPresentation } from "./AudioBookCardPresentation";
import { useCart } from "@/hooks/useCart";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { toast } from "@/hooks/useToast";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface AudioBookCardContainerProps {
  audiobook: Audiobook;
  featured?: boolean;
}

/**
 * Container component that handles business logic for AudioBook card
 * Manages state and side effects, delegates presentation to pure component
 */
export function AudioBookCardContainer({
  audiobook,
  featured = false,
}: AudioBookCardContainerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { addItem } = useCart();
  const { togglePlay, loadAudio } = useAudioPlayer();

  const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await addItem(audiobook);
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
  }, [addItem, audiobook]);

  const handlePlaySample = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isPlaying) {
      // Load the sample audio (in a real app, this would be the actual sample URL)
      loadAudio(`/samples/${audiobook.sample}`);
      setIsPlaying(true);
      
      // Auto-stop after 30 seconds for demo
      setTimeout(() => setIsPlaying(false), 30000);
    } else {
      setIsPlaying(false);
    }
    
    togglePlay();
  }, [isPlaying, loadAudio, togglePlay, audiobook.sample]);

  return (
    <AudioBookCardPresentation
      audiobook={audiobook}
      featured={featured}
      isPlaying={isPlaying}
      onPlaySample={handlePlaySample}
      onAddToCart={handleAddToCart}
    />
  );
}
