import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid, List, X } from "lucide-react";

interface BookFiltersProps {
  searchQuery: string;
  selectedGenre: string;
  sortBy: string;
  viewMode: "grid" | "list";
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onClearFilters: () => void;
}

export function BookFilters({
  searchQuery,
  selectedGenre,
  sortBy,
  viewMode,
  onSearchChange,
  onGenreChange,
  onSortChange,
  onViewModeChange,
  onClearFilters,
}: BookFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search audiobooks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Genre Filter */}
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Genres</SelectItem>
          <SelectItem value="Fiction">Fiction</SelectItem>
          <SelectItem value="Science Fiction">Science Fiction</SelectItem>
          <SelectItem value="Romance">Romance</SelectItem>
          <SelectItem value="Mystery">Mystery</SelectItem>
          <SelectItem value="Biography">Biography</SelectItem>
          <SelectItem value="Self-Help">Self-Help</SelectItem>
          <SelectItem value="History">History</SelectItem>
          <SelectItem value="Fantasy">Fantasy</SelectItem>
          <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="author">Author</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="duration">Duration</SelectItem>
        </SelectContent>
      </Select>

      {/* View Mode */}
      <div className="flex border rounded-lg">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className="rounded-r-none"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("list")}
          className="rounded-l-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Clear Filters Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilters}
        className="whitespace-nowrap"
      >
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );
}
