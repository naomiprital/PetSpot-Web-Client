import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/User";
import { editProfile, getUser } from "../services/UserService";

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, formData }: { userId: string; formData: FormData }) =>
      editProfile(userId, formData),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser._id] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};
