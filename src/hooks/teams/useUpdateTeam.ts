import { useMutation } from "@tanstack/react-query";
import { teamApi } from "../api/teamApi";
import { ITeamBody, ITeamNewBody } from "../types/types";

export const useUpdateTeam = () =>
  useMutation({
    mutationKey: ["update team"],
    mutationFn: async ({ id, body }: ITeamNewBody) => {
      const response = await teamApi.patch(`/${id}`, body);
      return response.data;
    },
  });
