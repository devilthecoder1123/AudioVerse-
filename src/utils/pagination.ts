import { Audiobook } from "@/lib/store";
import { getFilteredAudiobooks } from "./audiobookFilters";

export const getPaginatedAudiobooks = (
  books: Audiobook[],
  searchQuery: string,
  selectedGenre: string,
  sortBy: "title" | "author" | "price" | "rating" | "duration" | "newest",
  currentPage: number,
  booksPerPage: number
) => {
  const filtered = getFilteredAudiobooks(books, searchQuery, selectedGenre, sortBy);
  const totalBooks = filtered.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = 0;
  const endIndex = currentPage * booksPerPage;
  const paginatedBooks = filtered.slice(startIndex, endIndex);
  
  return {
    books: paginatedBooks,
    totalBooks,
    totalPages,
    hasMore: currentPage < totalPages,
    currentPage
  };
};
