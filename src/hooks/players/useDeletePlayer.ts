import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playerApi } from "../api/playerApi";

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete player"],
    mutationFn: async (id: number) => {
      const response = await playerApi.delete(`/${id}`);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["players"],
      });
    },
  });
};
