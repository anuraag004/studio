
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import type { Movie } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"
import { useUser } from './UserContext';

type Watchlist = { [userId: string]: Movie[] };

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()
  const { currentUser } = useUser();
  const [watchlists, setWatchlists] = useState<Watchlist>({});
  const isInitialMount = useRef(true);

  // Load from localStorage only on the client-side
  useEffect(() => {
    try {
      const savedWatchlists = localStorage.getItem('watchlists');
      if (savedWatchlists) {
        setWatchlists(JSON.parse(savedWatchlists));
      }
    } catch (error) {
      console.error("Failed to load watchlists from localStorage", error);
    }
  }, []);

  const currentWatchlist = currentUser ? watchlists[currentUser.id] || [] : [];
  
  // Effect for showing toasts
  useEffect(() => {
      // Don't run on initial mount
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('watchlists', JSON.stringify(watchlists));
    } catch (error) {
        console.error("Failed to save watchlist to localStorage", error);
    }

  }, [watchlists]);


  const addToWatchlist = (movie: Movie) => {
    if (!currentUser) {
      toast({
        title: "Please select a user profile",
        description: "You need to be logged in to add movies to a watchlist.",
        variant: "destructive"
      });
      return;
    }

    setWatchlists(prev => {
      const userWatchlist = prev[currentUser.id] || [];
      if (userWatchlist.some(m => m.id === movie.id)) {
        return prev; // Already in watchlist
      }
      toast({
        title: "Added to Watchlist",
        description: `"${movie.title}" has been added.`,
      })
      return {
        ...prev,
        [currentUser.id]: [...userWatchlist, movie]
      };
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    if (!currentUser) return;

    setWatchlists(prev => {
      const userWatchlist = prev[currentUser.id] || [];
      const movieToRemove = userWatchlist.find(movie => movie.id === movieId);
      if (movieToRemove) {
        toast({
            title: "Removed from Watchlist",
            description: `"${movieToRemove.title}" has been removed.`,
        })
      }
      return {
        ...prev,
        [currentUser.id]: userWatchlist.filter(movie => movie.id !== movieId)
      };
    });
  };

  const isInWatchlist = (movieId: string) => {
    if (!currentUser) return false;
    const userWatchlist = watchlists[currentUser.id] || [];
    return userWatchlist.some(movie => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist: currentWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
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
