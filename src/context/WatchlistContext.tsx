
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import type { Movie } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const isInitialMount = useRef(true);

  // Load from localStorage only on the client-side
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } catch (error) {
      console.error("Failed to load watchlist from localStorage", error);
    }
  }, []);

  // Save to localStorage and show toasts
  useEffect(() => {
    // Don't run on initial mount or initial load from localStorage
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
    }

  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prevWatchlist => {
      if (prevWatchlist.some(m => m.id === movie.id)) {
        return prevWatchlist;
      }
      toast({
        title: "Added to Watchlist",
        description: `"${movie.title}" has been added to your watchlist.`,
      })
      return [...prevWatchlist, movie];
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    setWatchlist(prevWatchlist => {
      const movieToRemove = prevWatchlist.find(movie => movie.id === movieId);
      if (movieToRemove) {
        toast({
          title: "Removed from Watchlist",
          description: `"${movieToRemove.title}" has been removed.`,
        })
      }
      return prevWatchlist.filter(movie => movie.id !== movieId);
    });
  };

  const isInWatchlist = (movieId: string) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
