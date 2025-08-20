import { PageHeader } from "@/components/forms/PageHeader";
import { BookFilters } from "@/components/books/BookFilters";
import { BookGrid } from "@/components/books/BookGrid";
import { Button } from "@/components/ui/button";
import type { Audiobook } from "@/audiobookdata/audiobook-data";

interface BooksPagePresentationProps {
  searchQuery: string;
  selectedGenre: string;
  sortBy: string;
  viewMode: "grid" | "list";
  filteredBooks: Audiobook[];
  totalBooks: number;
  hasMore: boolean;
  onViewModeChange: (mode: "grid" | "list") => void;
  onSearchQueryChange: (value: string) => void;
  onSelectedGenreChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onClearFilters: () => void;
  onLoadMore: () => void;
}

/**
 * Pure presentation component for Books page
 * Contains only UI logic, no business logic
 */
export function BooksPagePresentation({
  searchQuery,
  selectedGenre,
  sortBy,
  viewMode,
  filteredBooks,
  totalBooks,
  hasMore,
  onViewModeChange,
  onSearchQueryChange,
  onSelectedGenreChange,
  onSortByChange,
  onClearFilters,
  onLoadMore,
}: BooksPagePresentationProps) {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader
          title="Discover Audiobooks"
          subtitle="Explore our vast collection of premium audiobooks"
        />

        <BookFilters
          searchQuery={searchQuery}
          selectedGenre={selectedGenre}
          sortBy={sortBy}
          viewMode={viewMode}
          onSearchChange={onSearchQueryChange}
          onGenreChange={onSelectedGenreChange}
          onSortChange={onSortByChange}
          onViewModeChange={onViewModeChange}
          onClearFilters={onClearFilters}
        />

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBooks.length} of {totalBooks} audiobooks
          </p>
        </div>

        <BookGrid books={filteredBooks} viewMode={viewMode} />

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={onLoadMore}
              variant="outline"
              size="lg"
              className="px-8"
            >
              Load More Books
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
