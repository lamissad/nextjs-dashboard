"use client"

import React, { createContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  loggedIn: boolean;
} | null;

type UserContextType = {
  user: User;
  signIn: (userData: User) => void;
  signOut: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    const signIn = (userData: User) => {
        setUser(userData);
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
