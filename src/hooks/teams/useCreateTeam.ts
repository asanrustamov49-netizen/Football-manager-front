import { useMutation } from "@tanstack/react-query";
import { teamApi } from "../api/teamApi";
import { ITeamBody } from "../types/types";

export const useCreateTeam = () =>
  useMutation({
    mutationKey: ["create team"],
    mutationFn: async (body: ITeamBody) => {
      const response = await teamApi.post("", body);
      return response.data;
    },
  });
