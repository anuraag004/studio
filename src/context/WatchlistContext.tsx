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
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { toast } = useToast()

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

  const saveToLocalStorage = (items: Movie[]) => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
    }
  };

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prevWatchlist => {
      const newWatchlist = [...prevWatchlist, movie];
      saveToLocalStorage(newWatchlist);
      toast({
        title: "Added to Watchlist",
        description: `"${movie.title}" has been added to your watchlist.`,
      })
      return newWatchlist;
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    setWatchlist(prevWatchlist => {
      const movieToRemove = prevWatchlist.find(movie => movie.id === movieId);
      const newWatchlist = prevWatchlist.filter(movie => movie.id !== movieId);
      saveToLocalStorage(newWatchlist);
       if (movieToRemove) {
        toast({
          title: "Removed from Watchlist",
          description: `"${movieToRemove.title}" has been removed.`,
        })
      }
      return newWatchlist;
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
