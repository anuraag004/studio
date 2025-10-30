
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
  
  // Ref to track the previous state of the watchlist for comparison
  const prevWatchlistsRef = useRef<Watchlist>();

  // Load from localStorage on initial client-side render
  useEffect(() => {
    try {
      const savedWatchlists = localStorage.getItem('watchlists');
      const parsedWatchlists = savedWatchlists ? JSON.parse(savedWatchlists) : {};
      setWatchlists(parsedWatchlists);
      prevWatchlistsRef.current = parsedWatchlists; // Initialize ref
    } catch (error) {
      console.error("Failed to load watchlists from localStorage", error);
    }
  }, []);

  // Effect for saving to localStorage and showing toasts
  useEffect(() => {
    // Don't run if there is no current user
    if (!currentUser?.id) {
        prevWatchlistsRef.current = watchlists;
        return;
    }

    try {
      localStorage.setItem('watchlists', JSON.stringify(watchlists));
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
    }

    const prevUserWatchlist = prevWatchlistsRef.current?.[currentUser.id] || [];
    const currentUserWatchlist = watchlists[currentUser.id] || [];

    // Check if a movie was added
    if (currentUserWatchlist.length > prevUserWatchlist.length) {
      const addedMovie = currentUserWatchlist.find(movie => !prevUserWatchlist.some(m => m.id === movie.id));
      if (addedMovie) {
        toast({
          title: "Added to Watchlist",
          description: `"${addedMovie.title}" has been added.`,
        });
      }
    } 
    // Check if a movie was removed
    else if (currentUserWatchlist.length < prevUserWatchlist.length) {
      const removedMovie = prevUserWatchlist.find(movie => !currentUserWatchlist.some(m => m.id === movie.id));
      if (removedMovie) {
        toast({
          title: "Removed from Watchlist",
          description: `"${removedMovie.title}" has been removed.`,
        });
      }
    }

    // Update the ref to the current state for the next render
    prevWatchlistsRef.current = watchlists;

  }, [watchlists, currentUser, toast]);

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
        return prev; // Already in watchlist, don't change state
      }
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
      if (!userWatchlist.some(movie => movie.id === movieId)) {
        return prev; // Not in watchlist, don't change state
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
  
  const currentWatchlist = currentUser ? watchlists[currentUser.id] || [] : [];

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
