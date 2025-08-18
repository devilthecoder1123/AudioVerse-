"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AudioBookCard } from "@/components/audiobook/AudioBookCard";
import { mockAudiobooks, genres, getFilteredAudiobooks } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";

export default function Books() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const {
    searchQuery,
    selectedGenre,
    sortBy,
    setSearchQuery,
    setSelectedGenre,
    setSortBy,
  } = useAppStore();

  const filteredBooks = useMemo(() => {
    return getFilteredAudiobooks(
      mockAudiobooks,
      searchQuery,
      selectedGenre,
      sortBy
    );
  }, [searchQuery, selectedGenre, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Discover Audiobooks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our vast collection of premium audiobooks across all genres
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="mb-8 space-y-4 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search audiobooks, authors, narrators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-effect border-primary/20 focus:border-primary/40 text-base h-12"
            />
          </form>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
              {/* Genre Filter */}
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full sm:w-[180px] glass-effect border-primary/20">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select
                value={sortBy}
                onValueChange={(value: string) =>
                  setSortBy(value as "newest" | "title" | "price" | "rating")
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] glass-effect border-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="price">Price Low-High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="icon"
                className="sm:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* View Mode and Results Count */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
              <span className="text-sm text-muted-foreground">
                {filteredBooks.length} book
                {filteredBooks.length !== 1 ? "s" : ""} found
              </span>

              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || (selectedGenre !== "All" && selectedGenre)) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchQuery && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="h-6 text-xs"
                >
                  Search: &quot;{searchQuery}&quot; ×
                </Button>
              )}
              {selectedGenre && selectedGenre !== "All" && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedGenre("All")}
                  className="h-6 text-xs"
                >
                  Genre: {selectedGenre} ×
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Books Grid/List */}
        {filteredBooks.length > 0 ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            } animate-fade-in-up`}
            style={{ animationDelay: "0.2s" }}
          >
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <AudioBookCard audiobook={book} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("All");
                  }}
                >
                  Clear Filters
                </Button>
                <Button variant="primary">Browse All Books</Button>
              </div>
            </div>
          </div>
        )}

        {/* Load More Button (Mock) */}
        {filteredBooks.length > 0 && filteredBooks.length >= 8 && (
          <div className="text-center mt-12 animate-fade-in-up">
            <Button variant="outline" size="lg">
              Load More Books
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
