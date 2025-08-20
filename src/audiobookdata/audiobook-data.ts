export interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  description: string;
  cover: string;
  price: number;
  duration: string;
  genre: string;
  rating: number;
  reviews: number;
  sample: string;
  publishedDate: string;
  featured?: boolean;
}

// Well-structured mock data
export const audiobooks: Audiobook[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    narrator: "Carey Mulligan",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    cover: "/covers/midnight-library.jpg",
    price: 19.99,
    duration: "8h 32m",
    genre: "Fiction",
    rating: 4.8,
    reviews: 12847,
    sample: "sample-midnight-library.mp3",
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
    cover: "/covers/atomic-habits.jpg",
    price: 24.99,
    duration: "5h 35m",
    genre: "Self-Help",
    rating: 4.9,
    reviews: 28492,
    sample: "sample-atomic-habits.mp3",
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
    cover: "/covers/evelyn-hugo.jpg",
    price: 21.99,
    duration: "12h 10m",
    genre: "Romance",
    rating: 4.7,
    reviews: 15673,
    sample: "sample-evelyn-hugo.mp3",
    publishedDate: "2017-06-13",
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    narrator: "Scott Brick, Orlagh Cassidy, Euan Morton",
    description:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    cover: "/covers/dune.jpg",
    price: 29.99,
    duration: "21h 2m",
    genre: "Science Fiction",
    rating: 4.6,
    reviews: 8924,
    sample: "sample-dune.mp3",
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
    cover: "/covers/educated.jpg",
    price: 22.99,
    duration: "12h 10m",
    genre: "Biography",
    rating: 4.8,
    reviews: 19847,
    sample: "sample-educated.mp3",
    publishedDate: "2018-02-20",
  },
  {
    id: "6",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    narrator: "Lesley Manville",
    description:
      "In a peaceful retirement village, four unlikely friends meet weekly to investigate cold cases. But when a local developer is found dead, they find themselves in the middle of their first live case.",
    cover: "/covers/thursday-murder-club.jpg",
    price: 18.99,
    duration: "9h 25m",
    genre: "Mystery",
    rating: 4.5,
    reviews: 11234,
    sample: "sample-thursday-murder.mp3",
    publishedDate: "2020-09-03",
  },
  {
    id: "7",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    narrator: "Derek Perkins",
    description:
      "A Brief History of Humankind. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms?",
    cover: "/covers/sapiens.jpg",
    price: 26.99,
    duration: "15h 17m",
    genre: "History",
    rating: 4.7,
    reviews: 22183,
    sample: "sample-sapiens.mp3",
    publishedDate: "2014-09-04",
  },
  {
    id: "8",
    title: "Project Hail Mary",
    author: "Andy Weir",
    narrator: "Ray Porter",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
    cover: "/covers/project-hail-mary.jpg",
    price: 23.99,
    duration: "16h 10m",
    genre: "Science Fiction",
    rating: 4.9,
    reviews: 16742,
    sample: "sample-hail-mary.mp3",
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

// Filter and search utilities
export const searchAudiobooks = (
  books: Audiobook[],
  query: string,
  genre: string = "All",
  sortBy: "title" | "price" | "rating" | "newest" = "newest"
): Audiobook[] => {
  let filtered = [...books];

  // Apply search filter
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.narrator.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );
  }

  // Apply genre filter
  if (genre !== "All") {
    filtered = filtered.filter((book) => book.genre === genre);
  }

  // Apply sorting
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

export const getFeaturedBooks = (): Audiobook[] => {
  return audiobooks.filter((book) => book.featured);
};

export const getBookById = (id: string): Audiobook | undefined => {
  return audiobooks.find((book) => book.id === id);
};

export const getRelatedBooks = (
  bookId: string,
  limit: number = 4
): Audiobook[] => {
  const book = getBookById(bookId);
  if (!book) return [];

  return audiobooks
    .filter(
      (b) =>
        b.id !== bookId && (b.genre === book.genre || b.author === book.author)
    )
    .slice(0, limit);
};
