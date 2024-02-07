'use client';
// auth-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const defaultAuthContextValue: AuthContextType = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get('token');
    setIsLoggedIn(!!token);
  }, [cookies]);

  const login = (token: string) => {
    console.log('token =>', token);
    cookies.set('token', token);
    setIsLoggedIn(true);
    router.push('/profile');
  };

  const logout = () => {
    cookies.remove('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
