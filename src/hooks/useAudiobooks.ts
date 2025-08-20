import { useMemo } from 'react';
import { audiobooks, searchAudiobooks, getFeaturedBooks, getBookById, getRelatedBooks } from '@/audiobookdata/audiobook-data';
import type { Audiobook } from '@/audiobookdata/audiobook-data';

export interface UseAudiobooksFilters {
  query?: string;
  genre?: string;
  sortBy?: 'title' | 'price' | 'rating' | 'newest';
}

export interface UseAudiobooksReturn {
  audiobooks: Audiobook[];
  featuredBooks: Audiobook[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing audiobook data and filtering
 * Separates business logic from UI components
 */
export function useAudiobooks(filters: UseAudiobooksFilters = {}): UseAudiobooksReturn {
  const { query = '', genre = 'All', sortBy = 'newest' } = filters;

  const filteredAudiobooks = useMemo(() => {
    return searchAudiobooks(audiobooks, query, genre, sortBy);
  }, [query, genre, sortBy]);

  const featuredBooks = useMemo(() => {
    return getFeaturedBooks();
  }, []);

  return {
    audiobooks: filteredAudiobooks,
    featuredBooks,
    isLoading: false, // In a real app, this would track loading state
    error: null, // In a real app, this would track error state
  };
}

/**
 * Hook for getting a single audiobook by ID
 */
export function useAudiobook(id: string) {
  const audiobook = useMemo(() => {
    return getBookById(id);
  }, [id]);

  const relatedBooks = useMemo(() => {
    return id ? getRelatedBooks(id) : [];
  }, [id]);

  return {
    audiobook,
    relatedBooks,
    isLoading: false,
    error: audiobook ? null : 'Audiobook not found',
  };
}

/**
 * Hook for getting popular audiobooks
 */
export function usePopularAudiobooks(limit: number = 4) {
  const popularBooks = useMemo(() => {
    return audiobooks.slice(0, limit);
  }, [limit]);

  return {
    audiobooks: popularBooks,
    isLoading: false,
    error: null,
  };
}
