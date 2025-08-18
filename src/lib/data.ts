import { Audiobook } from "./store";

export const mockAudiobooks: Audiobook[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    narrator: "Carey Mulligan",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    cover: "/api/placeholder/300/400",
    price: 19.99,
    duration: "8h 32m",
    genre: "Fiction",
    rating: 4.8,
    reviews: 12847,
    sample: "sample1.mp3",
    publishedDate: "2020-08-13",
    featured: true,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    narrator: "James Clear",
    description:
      "An Easy & Proven Way to Build Good Habits & Break Bad Ones. No matter your goals, Atomic Habits offers a proven framework for improving every day.",
    cover: "/api/placeholder/300/400",
    price: 24.99,
    duration: "5h 35m",
    genre: "Self-Help",
    rating: 4.9,
    reviews: 28492,
    sample: "sample2.mp3",
    publishedDate: "2018-10-16",
    featured: true,
  },
  {
    id: "3",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    narrator: "Alma Cuervo, Julia Whelan, Robin Miles",
    description:
      "Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    cover: "/api/placeholder/300/400",
    price: 21.99,
    duration: "12h 10m",
    genre: "Romance",
    rating: 4.7,
    reviews: 15673,
    sample: "sample3.mp3",
    publishedDate: "2017-06-13",
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    narrator: "Scott Brick, Orlagh Cassidy, Euan Morton",
    description:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    cover: "/api/placeholder/300/400",
    price: 29.99,
    duration: "21h 2m",
    genre: "Science Fiction",
    rating: 4.6,
    reviews: 8924,
    sample: "sample4.mp3",
    publishedDate: "1965-08-01",
    featured: true,
  },
  {
    id: "5",
    title: "Educated",
    author: "Tara Westover",
    narrator: "Julia Whelan",
    description:
      "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    cover: "/api/placeholder/300/400",
    price: 22.99,
    duration: "12h 10m",
    genre: "Biography",
    rating: 4.8,
    reviews: 19847,
    sample: "sample5.mp3",
    publishedDate: "2018-02-20",
  },
  {
    id: "6",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    narrator: "Lesley Manville",
    description:
      "In a peaceful retirement village, four unlikely friends meet weekly to investigate cold cases. But when a local developer is found dead, they find themselves in the middle of their first live case.",
    cover: "/api/placeholder/300/400",
    price: 18.99,
    duration: "9h 25m",
    genre: "Mystery",
    rating: 4.5,
    reviews: 11234,
    sample: "sample6.mp3",
    publishedDate: "2020-09-03",
  },
  {
    id: "7",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    narrator: "Derek Perkins",
    description:
      "A Brief History of Humankind. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms?",
    cover: "/api/placeholder/300/400",
    price: 26.99,
    duration: "15h 17m",
    genre: "History",
    rating: 4.7,
    reviews: 22183,
    sample: "sample7.mp3",
    publishedDate: "2014-09-04",
  },
  {
    id: "8",
    title: "Project Hail Mary",
    author: "Andy Weir",
    narrator: "Ray Porter",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
    cover: "/api/placeholder/300/400",
    price: 23.99,
    duration: "16h 10m",
    genre: "Science Fiction",
    rating: 4.9,
    reviews: 16742,
    sample: "sample8.mp3",
    publishedDate: "2021-05-04",
    featured: true,
  },
];

export const genres = [
  "All",
  "Fiction",
  "Science Fiction",
  "Romance",
  "Mystery",
  "Biography",
  "Self-Help",
  "History",
  "Fantasy",
  "Thriller",
  "Non-Fiction",
];

export const getFilteredAudiobooks = (
  books: Audiobook[],
  searchQuery: string,
  selectedGenre: string,
  sortBy: "title" | "price" | "rating" | "newest"
) => {
  let filtered = books;

  // Search filter
  if (searchQuery) {
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.narrator.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Genre filter
  if (selectedGenre && selectedGenre !== "All") {
    filtered = filtered.filter((book) => book.genre === selectedGenre);
  }

  // Sort
  switch (sortBy) {
    case "title":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "price":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
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
