import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getUserDetails, isUserLoggedIn } from '../utils/auth';

interface User {
  name: string;
  email: string;
  picture?: string;
  [key: string]: any;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userDetails = getUserDetails()
    setIsLoggedIn(userDetails.isLoggedIn)
    setUser(userDetails.details);
  }, []);
 
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
