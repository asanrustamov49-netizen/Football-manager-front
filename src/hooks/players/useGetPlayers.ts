import { useMutation, useQuery } from "@tanstack/react-query";
import { IGetPlayerResponse, IGetTeamResponse } from "../types/types";
import { playerApi } from "../api/playerApi";

export const useGetPlayers = () =>
  useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await playerApi.get<IGetPlayerResponse>("");
      return response.data.data;
    },
  });
