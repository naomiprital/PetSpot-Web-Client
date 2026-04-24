import { createContext, useContext, type ReactNode } from 'react';
import type { Listing } from '../components/MainFeedListingCard';
import { AnimalsEnum, ListingTypeEnum } from '../../utils/consts';

interface ListingsContextType {
  listings: Listing[];
}

const ListingsContext = createContext<ListingsContextType | null>(null);

const mockListings: Listing[] = [
  {
    _id: '1',
    listingType: ListingTypeEnum.LOST,
    animalType: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    location: 'Central Park, NY',
    lastSeen: Date.now() - 100000000,
    description:
      'Buster is a friendly golden retriever. Wearing a blue collar. Last seen near the park',
    boosts: ['id1', 'id2', 'id3'],
    comments: [
      {
        id: 'c1',
        text: 'I think I saw a dog like this near the boat house!',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    userId: 'user-1',
    author: {
      firstName: 'John',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      email: 'john@example.com',
      phoneNumber: '1234567890',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '2',
    listingType: ListingTypeEnum.FOUND,
    animalType: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    location: 'Brooklyn, NY',
    lastSeen: Date.now() - 200000000,
    description: 'Found a small black cat near the subway station. Very vocal and friendly.',
    boosts: ['id1', 'id2'],
    comments: [
      {
        id: 'c2',
        text: 'Is this the cat that usually hangs around 5th Ave?',
        createdAt: Date.now() - 15000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c3',
        text: 'Yes! I think it belongs to the corner shop owner.',
        createdAt: Date.now() - 10000000,
        user: {
          name: 'Sarah',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c4',
        text: 'I will go check with him today.',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c5',
        text: 'I will go check with him today.',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    userId: 'user-2',
    author: {
      firstName: 'Sarah',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      email: 'sarah@example.com',
      phoneNumber: '1234567890',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '3',
    listingType: ListingTypeEnum.LOST,
    animalType: AnimalsEnum.BIRD,
    imageUrl:
      'https://us1.discourse-cdn.com/flex016/uploads/inaturalist/optimized/3X/e/a/eaa730a3a558b159061c738eb3ab961739294c66_2_387x500.jpeg',
    location: 'Queens, NY',
    lastSeen: Date.now() - 50000000,
    description: 'Green parakeet flew out the window. Answers to "Kiwi".',
    boosts: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6'],
    comments: [],
    userId: 'user-3',
    author: {
      firstName: 'Mike',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      email: 'mike@example.com',
      phoneNumber: '1234567890',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '4',
    listingType: ListingTypeEnum.FOUND,
    animalType: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
    location: 'Manhattan, NY',
    lastSeen: Date.now() - 300000000,
    description: 'Found a stray husky wandering around. No collar, very energetic.',
    boosts: ['id1', 'id2', 'id3', 'id4', 'id5'],
    comments: [
      {
        id: 'c5',
        text: 'I saw posters for a husky nearby, let me check the number.',
        createdAt: Date.now() - 20000000,
        user: {
          name: 'John',
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c6',
        text: 'Did he have a blue harness?',
        createdAt: Date.now() - 15000000,
        user: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c7',
        text: 'No harness, just empty.',
        createdAt: Date.now() - 10000000,
        user: {
          name: 'Emma',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c8',
        text: 'Ok, I will keep an eye out for posters.',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c9',
        text: 'Thanks! Hopefully we find the owner.',
        createdAt: Date.now() - 1000000,
        user: {
          name: 'Emma',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c10',
        text: 'I will go check with him today.',
        createdAt: Date.now() - 1000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    userId: 'user-4',
    author: {
      firstName: 'Emma',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      email: 'emma@example.com',
      phoneNumber: '1234567890',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '5',
    listingType: ListingTypeEnum.LOST,
    animalType: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    location: 'Haifa, Israel',
    lastSeen: Date.now() - 80000000,
    description: 'Orange tabby cat named Mango, very friendly. Missing since Tuesday morning.',
    boosts: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6'],
    comments: [],
    userId: 'user-6',
    author: {
      firstName: 'Yael',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      email: 'yael@example.com',
      phoneNumber: '+972501234567',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '6',
    listingType: ListingTypeEnum.FOUND,
    animalType: AnimalsEnum.RABBIT,
    imageUrl:
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
    location: 'Tel Aviv, Israel',
    lastSeen: Date.now() - 150000000,
    description: 'Found a white rabbit near Rothschild Blvd. Has a red tag on its ear.',
    boosts: ['id1', 'id2'],
    comments: [
      {
        id: 'c11',
        text: 'My neighbor lost a rabbit last week, could be hers!',
        createdAt: Date.now() - 140000000,
        user: {
          name: 'Dan',
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    userId: 'user-7',
    author: {
      firstName: 'Noa',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      email: 'noa@example.com',
      phoneNumber: '+972509876543',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '7',
    listingType: ListingTypeEnum.LOST,
    animalType: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
    location: 'Jerusalem, Israel',
    lastSeen: Date.now() - 30000000,
    description: 'Black Labrador named Shadow. Escaped through an open gate. Very gentle.',
    boosts: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7'],
    comments: [],
    userId: 'user-8',
    author: {
      firstName: 'Avi',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      email: 'avi@example.com',
      phoneNumber: '+972521112222',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '8',
    listingType: ListingTypeEnum.FOUND,
    animalType: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80',
    location: 'Beer Sheva, Israel',
    lastSeen: Date.now() - 420000000,
    description: 'Small white dog, possibly a Bichon Frise. No collar. Found near the park.',
    boosts: ['id1'],
    comments: [
      {
        id: 'c12',
        text: 'Looks like the one I saw a flyer for near the mall.',
        createdAt: Date.now() - 400000000,
        user: {
          name: 'Lior',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    userId: 'user-9',
    author: {
      firstName: 'Roni',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      email: 'roni@example.com',
      phoneNumber: '+972531231234',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '9',
    listingType: ListingTypeEnum.LOST,
    animalType: AnimalsEnum.BIRD,
    imageUrl:
      'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=600&q=80',
    location: 'Netanya, Israel',
    lastSeen: Date.now() - 60000000,
    description: 'Blue and yellow budgie named Sunny. Flew out of an open window on Thursday.',
    boosts: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7'],
    comments: [],
    userId: 'user-10',
    author: {
      firstName: 'Maya',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      email: 'maya@example.com',
      phoneNumber: '+972541234567',
    },
    isResolved: false,
    isDeleted: false,
  },
  {
    _id: '10',
    listingType: ListingTypeEnum.FOUND,
    animalType: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=80',
    location: 'Rishon LeZion, Israel',
    lastSeen: Date.now() - 520000000,
    description: 'Grey cat with green eyes found sheltering under a car. Seems well-groomed.',
    boosts: ['id1', 'id2', 'id3'],
    comments: [
      {
        id: 'c13',
        text: 'Posted on the neighborhood group, no one claimed it yet.',
        createdAt: Date.now() - 500000000,
        user: {
          name: 'Tal',
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    userId: 'user-11',
    author: {
      firstName: 'Shira',
      lastName: 'Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      email: 'shira@example.com',
      phoneNumber: '+972551112233',
    },
    isResolved: false,
    isDeleted: false,
  },
];

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ListingsContext.Provider value={{ listings: mockListings }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = (): Listing[] => {
  const context = useContext(ListingsContext);
  if (!context) throw new Error('useListings must be used inside <ListingsProvider>');
  return context.listings;
};
