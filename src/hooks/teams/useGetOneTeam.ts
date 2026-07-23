import { useMutation, useQuery } from "@tanstack/react-query";
import { teamApi } from "../api/teamApi";
import { IGetOneTeamResponse } from "../types/types";

export const useGetOneTeam = (id: number) =>
  useQuery({
    queryKey: ["get one team"],
    queryFn: async () => {
      const response = await teamApi.get<IGetOneTeamResponse>(`/${id}`);
      return response.data.data;
    },
  });
