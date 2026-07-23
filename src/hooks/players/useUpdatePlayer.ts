import { useMutation } from "@tanstack/react-query";
import { teamApi } from "../api/teamApi";
import { IPlayerNewBody, ITeamBody, ITeamNewBody } from "../types/types";
import { playerApi } from "../api/playerApi";

export const useUpdatePlayer = () =>
  useMutation({
    mutationKey: ["update player"],
    mutationFn: async ({ id, body }: IPlayerNewBody) => {
      const response = await playerApi.patch(`/${id}`, body);
      return response.data;
    },
  });
