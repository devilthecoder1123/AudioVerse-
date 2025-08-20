"use client";

import { useState, useMemo } from "react";
import { mockAudiobooks, getPaginatedAudiobooks } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { BooksPagePresentation } from "./BooksPagePresentation";

/**
 * Container component for Books page that handles business logic
 */
export function BooksPageContainer() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const {
    searchQuery,
    selectedGenre,
    sortBy,
    currentPage,
    booksPerPage,
    setSearchQuery,
    setSelectedGenre,
    setSortBy,
    setCurrentPage,
    resetPagination,
  } = useAppStore();

  const paginatedData = useMemo(() => {
    return getPaginatedAudiobooks(
      mockAudiobooks,
      searchQuery,
      selectedGenre,
      sortBy,
      currentPage,
      booksPerPage
    );
  }, [searchQuery, selectedGenre, sortBy, currentPage, booksPerPage]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSortBy("newest");
    resetPagination();
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <BooksPagePresentation
      viewMode={viewMode}
      searchQuery={searchQuery}
      selectedGenre={selectedGenre}
      sortBy={sortBy}
      filteredBooks={paginatedData.books}
      totalBooks={paginatedData.totalBooks}
      hasMore={paginatedData.hasMore}
      onViewModeChange={setViewMode}
      onSearchQueryChange={setSearchQuery}
      onSelectedGenreChange={setSelectedGenre}
      onSortByChange={(value: string) =>
        setSortBy(value as "title" | "author" | "price" | "rating" | "duration" | "newest")
      }
      onClearFilters={handleClearFilters}
      onLoadMore={handleLoadMore}
    />
  );
}
