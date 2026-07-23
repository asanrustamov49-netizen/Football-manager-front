import { useMutation } from "@tanstack/react-query";
import { IPlayerBody, ITeamBody } from "../types/types";
import { playerApi } from "../api/playerApi";

export const useCreatePlayer = () =>
  useMutation({
    mutationKey: ["create player"],
    mutationFn: async (body: IPlayerBody) => {
      const response = await playerApi.post("", body);
      return response.data;
    },
  });
