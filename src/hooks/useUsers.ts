import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/User";
import { editProfile, getUser } from "../services/UserService";

export const useUser = (id?: string) => {
  return useQuery<User | null>({
    queryKey: id ? ['user', id] : ['auth'],
    queryFn: async () => {
      const targetId = id || localStorage.getItem('userId');
      
      if (!targetId) return null;

      if (!id) {
        const token = localStorage.getItem('token');
        const rToken = localStorage.getItem('refreshToken');
        if (!token && !rToken) return null;
      }

      try {
        return await getUser(targetId);
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!(id || localStorage.getItem('userId')),
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
