import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/User';
import { getUser } from '../services/UserService';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const storedUserId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (storedUserId && (token || refreshToken)) {
        try {
          const data = await getUser(storedUserId);
          setUser(data);
        } catch (error: any) {
          setUser(null);
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    initUser();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used inside <UserProvider>');
  return context;
};
