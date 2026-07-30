"use client"
import { useMutation } from "@tanstack/react-query";
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
