import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface BookCoverProps {
  book: Audiobook;
  isPlaying: boolean;
  onPlaySample: () => void;
}

export function BookCover({ book, isPlaying, onPlaySample }: BookCoverProps) {
  return (
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
                onClick={onPlaySample}
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
              <div className="absolute bottom-4 left-4 opacity-80">
                <div className="flex items-end space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{
                        height: `${20 + (i % 4) * 15}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
