"use client"
import { useQuery } from "@tanstack/react-query";
import { playerApi } from "./api/playerApi";
import { getStatResponse } from "./types/types";

export const useGetStatistics = () => useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
        const response = await playerApi.get<getStatResponse>("/statistics")
        return response.data
    }
})