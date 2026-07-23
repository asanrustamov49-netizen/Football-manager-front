import { useMutation, useQuery } from "@tanstack/react-query";
import { IGetOnePlayerResponse, IGetOneTeamResponse } from "../types/types";
import { playerApi } from "../api/playerApi";

export const useGetOnePlayer = (id: number) =>
  useQuery({
    queryKey: ["get one player"],
    queryFn: async () => {
      const response = await playerApi.get<IGetOnePlayerResponse>(`/${id}`);
      return response.data.data;
    },
  });
