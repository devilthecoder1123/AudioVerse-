import { Audiobook } from "@/lib/store";

export const getFilteredAudiobooks = (
  books: Audiobook[],
  searchQuery: string,
  selectedGenre: string,
  sortBy: "title" | "author" | "price" | "rating" | "duration" | "newest"
): Audiobook[] => {
  let filtered = [...books];

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.narrator.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by genre
  if (selectedGenre && selectedGenre !== "All") {
    filtered = filtered.filter((book) => book.genre === selectedGenre);
  }

  // Sort books
  switch (sortBy) {
    case "title":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "author":
      filtered.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case "price":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "duration":
      const getDurationInMinutes = (duration: string) => {
        const match = duration.match(/(\d+)h\s*(\d+)m/);
        if (match) {
          return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        return 0;
      };
      filtered.sort((a, b) => getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration));
      break;
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      );
      break;
  }

  return filtered;
};
