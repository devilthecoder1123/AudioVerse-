import { AudioBookCard } from "@/components/audiobook/AudioBookCard";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface RelatedBooksProps {
  relatedBooks: Audiobook[];
}

export function RelatedBooks({ relatedBooks }: RelatedBooksProps) {
  if (!relatedBooks.length) return null;

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
      <h3 className="text-2xl font-bold mb-8 text-center">
        You Might Also Like
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedBooks.slice(0, 4).map((book, index) => (
          <div 
            key={book.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <AudioBookCard audiobook={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
