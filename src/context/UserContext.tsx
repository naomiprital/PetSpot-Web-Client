import { createContext, useContext, useState, type ReactNode } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  createdAt: number;
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<Omit<User, 'id' | 'email' | 'createdAt'>>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

// TODO: Replace with real user data
const MOCK_USER: User = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+972 501234567',
  avatarUrl: '/basicProfilePicture.png',
  createdAt: new Date('2024-03-15').getTime(),
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(MOCK_USER);

  const updateUser = (updates: Partial<Omit<User, 'id' | 'email' | 'createdAt'>>) => {
    // TODO: Replace with api call.
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used inside <UserProvider>');
  return context;
};
