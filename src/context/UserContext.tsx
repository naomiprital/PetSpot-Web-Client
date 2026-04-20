import { createContext, useContext, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  createdAt: number;
}

interface UserContextType {
  user: User;
}

const UserContext = createContext<UserContextType | null>(null);

// TODO: Replace with real user data
const MOCK_USER: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+972 501234567',
  avatarUrl: '/basicProfilePicture.png',
  createdAt: new Date('2024-03-15').getTime(),
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return <UserContext.Provider value={{ user: MOCK_USER }}>{children}</UserContext.Provider>;
};

export const useUser = (): User => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used inside <UserProvider>');
  return context.user;
};
