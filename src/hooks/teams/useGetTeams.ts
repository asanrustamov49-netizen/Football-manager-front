import { useMutation, useQuery } from "@tanstack/react-query";
import { teamApi } from "../api/teamApi";
import { IGetTeamResponse } from "../types/types";

export const useGetTeams = () =>
  useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await teamApi.get<IGetTeamResponse>("");
      return response.data.data;
    },
  });
