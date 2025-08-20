import { AudioBookCardContainer } from "@/components/audiobook/AudioBookCardContainer";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface BookGridProps {
  books: Audiobook[];
  viewMode: "grid" | "list";
}

export function BookGrid({ books, viewMode }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        <p className="text-lg text-muted-foreground mb-4">
          No audiobooks found matching your criteria.
        </p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters to find more results.
        </p>
      </div>
    );
  }

  const gridClass = viewMode === "grid" 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    : "flex flex-col gap-4";

  return (
    <div className={`${gridClass} animate-fade-in-up`}>
      {books.map((audiobook, index) => (
        <div
          key={audiobook.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <AudioBookCardContainer
            audiobook={audiobook}
          />
        </div>
      ))}
    </div>
  );
}
