'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  loggedIn: boolean;
} | null;

type UserContextType = {
  user: User;
  signIn: (userData: User) => void;
  signOut: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data is stored in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
