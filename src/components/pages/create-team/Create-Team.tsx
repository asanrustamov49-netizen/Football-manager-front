"use client";
import { useForm } from "react-hook-form";
import scss from "./createTeam.module.scss";
import { ITeamBody } from "@/hooks/types/types";
import { useCreateTeam } from "@/hooks/teams/useCreateTeam";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamSchema, TeamForm } from "@/validation/teams.schema";

const CreateTeam = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { mutate: createTeam } = useCreateTeam();
  const { push } = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TeamForm>({
    resolver: zodResolver(teamSchema),
  });
  const handleData = (data: ITeamBody) => {
    createTeam(data, {
      onSuccess: () => {
        setSuccess(true);
        reset();
      },
    });
  };

  const handlePush = () => {
    setSuccess(false);
    push("/");
  };
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.card}>
            <h1>Добавление команды</h1>

            <form onSubmit={handleSubmit(handleData)}>
              <div className={scss.inputGroup}>
                <label>Название</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Введите название команды"
                />
                {errors.name && (
                  <span className={scss.error}>{errors.name.message}</span>
                )}
              </div>

              <div className={scss.inputGroup}>
                <label>Страна</label>
                <input
                  {...register("country")}
                  type="text"
                  placeholder="Введите страну"
                />
                {errors.country && (
                  <span className={scss.error}>{errors.country.message}</span>
                )}
              </div>

              <div className={scss.inputGroup}>
                <label>Тренер</label>
                <input
                  {...register("coach")}
                  type="text"
                  placeholder="Введите имя тренера"
                />
                {errors.coach && (
                  <span className={scss.error}>{errors.coach.message}</span>
                )}
              </div>

              <div className={scss.inputGroup}>
                <label>Логотип команды</label>
                <input
                  {...register("logo")}
                  type="text"
                  placeholder="Введите ссылку на логотип"
                />
                {errors.logo && (
                  <span className={scss.error}>{errors.logo.message}</span>
                )}
              </div>

              <button type="submit" className={scss.submitBtn}>
                Добавить команду
              </button>
            </form>
          </div>
        </div>
      </div>
      {success && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <h2>✅ Команда успешно создана!</h2>

            <p>Новая команда была успешно добавлена.</p>

            <div className={scss.btns}>
              <button onClick={() => setSuccess(false)}>ОК</button>
              <button onClick={() => handlePush()}>
                Посмотреть на команду
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateTeam;
