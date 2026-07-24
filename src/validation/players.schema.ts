import { z } from "zod";

export const playerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Имя игрока должно содержать минимум 2 символа")
    .max(50, "Имя игрока не должно превышать 50 символов"),
  age: z
    .number()
    .min(16, "Возраст игрока должен быть не меньше 16")
    .max(50, "Возраст игрока должен быть не больше 50"),
  salary: z.number().positive("Зарплата должна быть больше 0"),
  image: z.string().trim().url("Введите корректную ссылку на изображение"),
  team_id: z.number().nullable(),
});

export type PlayerForm = z.infer<typeof playerSchema>;
