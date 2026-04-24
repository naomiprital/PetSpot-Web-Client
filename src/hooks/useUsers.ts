import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '../types/User';
import { editProfile, getUser } from '../services/UserService';

export const useUser = (id?: string) => {
  return useQuery<User | null>({
    queryKey: id ? ['user', id] : ['auth'],

    queryFn: async () => {
      try {
        if (id) {
          return await getUser(id);
        }
        const userId = localStorage.getItem('userId');
        if (!userId) return null;

        return await getUser(userId);
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!(id || localStorage.getItem('userId')),
    retry: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, formData }: { userId: string; formData: FormData }) =>
      editProfile(userId, formData),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser._id] });
      queryClient.setQueryData(['auth'], updatedUser);
    },
  });
};
