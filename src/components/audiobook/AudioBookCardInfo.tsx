import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface AudioBookCardInfoProps {
  audiobook: Audiobook;
  featured?: boolean;
}

export function AudioBookCardInfo({ audiobook, featured = false }: AudioBookCardInfoProps) {
  return (
    <div className="space-y-2">
      <h3 className={`font-semibold line-clamp-1 ${featured ? "text-lg" : "text-base"}`}>
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
    </div>
  );
}
