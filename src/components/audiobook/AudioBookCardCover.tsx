import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface AudioBookCardCoverProps {
  audiobook: Audiobook;
  featured?: boolean;
  isPlaying: boolean;
  onPlaySample: (e: React.MouseEvent) => void;
}

export function AudioBookCardCover({ 
  audiobook, 
  featured = false, 
  isPlaying, 
  onPlaySample 
}: AudioBookCardCoverProps) {
  const imageHeight = featured ? "h-64" : "h-48";

  return (
    <div className="relative">
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
            onClick={onPlaySample}
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

        {/* Audio visualizer */}
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
    </div>
  );
}
