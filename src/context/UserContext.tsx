'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  viewingHistory: string[];
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (userId: string) => void;
  logout: () => void;
}

const users: User[] = [
  { 
    id: 'alex@example.com', 
    name: 'Alex', 
    avatar: 'https://picsum.photos/seed/alex/40/40',
    viewingHistory: ['Cosmic Odyssey', 'Blade Runner 2049']
  },
  { 
    id: 'sam@example.com', 
    name: 'Sam', 
    avatar: 'https://picsum.photos/seed/sam/40/40',
    viewingHistory: ['Jungle Cruise', 'Knives Out']
  },
  { 
    id: 'casey@example.com', 
    name: 'Casey', 
    avatar: 'https://picsum.photos/seed/casey/40/40',
    viewingHistory: ['The Lord of the Rings: The Fellowship of the Ring', 'Avatar: The Way of Water']
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUser');
    const user = users.find(u => u.id === savedUserId);
    setCurrentUserState(user || null);
  }, []);

  const setCurrentUser = (userId: string) => {
    const user = users.find(u => u.id === userId) || null;
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('currentUser', user.id);
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  const logout = () => {
    setCurrentUser('');
  };

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
