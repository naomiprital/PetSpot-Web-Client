import { createContext, useContext, type ReactNode } from 'react';
import type { Listing } from '../components/ListingCard';
import { StatusEnum, AnimalsEnum } from '../../utils/consts';

interface ListingsContextType {
  listings: Listing[];
}

const ListingsContext = createContext<ListingsContextType | null>(null);

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    status: StatusEnum.LOST,
    animal: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    location: 'Central Park, NY',
    date: Date.now() - 100000000,
    description:
      'Buster is a friendly golden retriever. Wearing a blue collar. Last seen near the park',
    comments: 1,
    userId: 'user-1',
    user: {
      name: 'John Doe',
      avatar: '/basicProfilePicture.png',
    },
  },
  {
    id: '2',
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    location: 'Brooklyn, NY',
    date: Date.now() - 200000000,
    description: 'Found a small black cat near the subway station. Very vocal and friendly.',
    comments: 3,
    userId: 'user-2',
    user: {
      name: 'Sarah',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: '3',
    status: StatusEnum.LOST,
    animal: AnimalsEnum.BIRD,
    imageUrl:
      'https://us1.discourse-cdn.com/flex016/uploads/inaturalist/optimized/3X/e/a/eaa730a3a558b159061c738eb3ab961739294c66_2_387x500.jpeg',
    location: 'Queens, NY',
    date: Date.now() - 50000000,
    description: 'Green parakeet flew out the window. Answers to "Kiwi".',
    comments: 0,
    userId: 'user-3',
    user: {
      name: 'Mike',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: '4',
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
    location: 'Manhattan, NY',
    date: Date.now() - 300000000,
    description: 'Found a stray husky wandering around. No collar, very energetic.',
    comments: 5,
    userId: 'user-1',
    user: {
      name: 'John Doe',
      avatar: '/basicProfilePicture.png',
    },
  },
  {
    id: '5',
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    location: 'The Bronx, NY',
    date: Date.now() - 450000000,
    description: 'Found an orange tabby near the school yard. Very tame and healthy.',
    comments: 2,
    userId: 'user-1',
    user: {
      name: 'John Doe',
      avatar: '/basicProfilePicture.png',
    },
  },
];

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ListingsContext.Provider value={{ listings: MOCK_LISTINGS }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = (): Listing[] => {
  const context = useContext(ListingsContext);
  if (!context) throw new Error('useListings must be used inside <ListingsProvider>');
  return context.listings;
};
