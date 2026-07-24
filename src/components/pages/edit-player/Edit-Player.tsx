"use client";
import { useEffect, useState } from "react";
import scss from "./edit-Player.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useUpdatePlayer } from "@/hooks/players/useUpdatePlayer";
import { useGetOnePlayer } from "@/hooks/players/useGetOnePlayer";
import { IPlayerBody } from "@/hooks/types/types";
import { useForm } from "react-hook-form";
import { useGetTeams } from "@/hooks/teams/useGetTeams";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerForm, playerSchema } from "@/validation/players.schema";

const EditPlayer = () => {
  const { data: teams } = useGetTeams();
  const [success, setSuccess] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const { mutate: updateplayer } = useUpdatePlayer();
  const { data: player } = useGetOnePlayer(Number(params.id));
  const { push } = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PlayerForm>({
    resolver: zodResolver(playerSchema),
  });
  const handleData = (data: IPlayerBody) => {
    updateplayer(
      { id: Number(params.id), body: data },
      {
        onSuccess: () => {
          setSuccess(true);
          reset();
        },
      },
    );
  };
  useEffect(() => {
    if (player) {
      reset({
        name: player.name,
        age: player.age,
        salary: player.salary,
        image: player.image,
        team_id: player.team_id,
      });
    }
  }, [player, reset]);
  const handlePush = () => {
    setSuccess(false);
    push("/players");
  };
  return (
    <section className={scss.createPlayer}>
      <div className={scss.container}>
        <div className={scss.card}>
          <h1>Изменение игрока</h1>

          <form onSubmit={handleSubmit(handleData)}>
            <div className={scss.inputGroup}>
              <label>Имя</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Введите имя игрока"
              />
              {errors.name && (
                <span className={scss.error}>{errors.name.message}</span>
              )}
            </div>

            <div className={scss.inputGroup}>
              <label>Возраст</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                placeholder="Введите возраст"
              />
              {errors.age && (
                <span className={scss.error}>{errors.age.message}</span>
              )}
            </div>

            <div className={scss.inputGroup}>
              <label>Зарплата</label>
              <input
                {...register("salary", { valueAsNumber: true })}
                type="number"
                placeholder="Введите зарплату"
              />
              {errors.salary && (
                <span className={scss.error}>{errors.salary.message}</span>
              )}
            </div>

            <div className={scss.inputGroup}>
              <label>Фото игрока</label>
              <input
                {...register("image")}
                type="text"
                placeholder="Введите ссылку на изображение"
              />
              {errors.image && (
                <span className={scss.error}>{errors.image.message}</span>
              )}
            </div>

            <div className={scss.inputGroup}>
              <label>Команда</label>

              <select
                {...register("team_id", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
              >
                <option value="">Выберите команду</option>
                <option value="">Free Agent</option>
                {teams?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.team_id && (
                <span className={scss.error}>{errors.team_id.message}</span>
              )}
            </div>

            <button type="submit" className={scss.submitBtn}>
              Изменить игрока
            </button>
          </form>
        </div>
      </div>
      {success && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <h2>✅ Игрок успешно изменен!</h2>

            <p>Старый игрок был успешно изменен.</p>

            <div className={scss.btns}>
              <button onClick={() => setSuccess(false)}>ОК</button>
              <button onClick={() => handlePush()}>Посмотреть на игрока</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditPlayer;
