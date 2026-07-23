import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../api/teamApi";

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTeam"],
    mutationFn: async (id: number) => {
      const response = await teamApi.delete(`/${id}`);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });
};
