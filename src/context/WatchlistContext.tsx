
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        return JSON.parse(savedWatchlist);
      }
    } catch (error) {
      console.error("Failed to load watchlist from localStorage", error);
    }
    return [];
  });
  
  useEffect(() => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
    }
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prevWatchlist => {
      const newWatchlist = [...prevWatchlist, movie];
      toast({
        title: "Added to Watchlist",
        description: `"${movie.title}" has been added to your watchlist.`,
      })
      return newWatchlist;
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    let movieToRemove: Movie | undefined;
    setWatchlist(prevWatchlist => {
      movieToRemove = prevWatchlist.find(movie => movie.id === movieId);
      const newWatchlist = prevWatchlist.filter(movie => movie.id !== movieId);
      return newWatchlist;
    });

    if (movieToRemove) {
      toast({
        title: "Removed from Watchlist",
        description: `"${movieToRemove.title}" has been removed.`,
      })
    }
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
