import { z } from "zod";

export const teamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Название команды должно содержать минимум 2 символа")
    .max(50, "Название команды не должно превышать 50 символов"),
  country: z
    .string()
    .trim()
    .min(2, "Название страны должно содержать минимум 2 символа")
    .max(50, "Название страны не должно превышать 50 символов"),
  coach: z
    .string()
    .trim()
    .min(2, "Имя тренера должно содержать минимум 2 символа")
    .max(50, "Имя тренера не должно превышать 50 символов"),
  logo: z.string().trim().url("Введите корректную ссылку на логотип"),
});

export type TeamForm = z.infer<typeof teamSchema>;
