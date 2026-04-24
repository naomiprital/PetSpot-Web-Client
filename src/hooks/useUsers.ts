import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/User";
import { getUser } from "../services/UserService";

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
};
