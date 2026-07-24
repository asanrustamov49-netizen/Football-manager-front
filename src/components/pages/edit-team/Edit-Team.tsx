import { useEffect, useState } from "react";
import scss from "./edit-Team.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ITeamBody, ITeamNewBody } from "@/hooks/types/types";
import { useGetOneTeam } from "@/hooks/teams/useGetOneTeam";
import { useParams } from "next/navigation";
import { useUpdateTeam } from "@/hooks/teams/useUpdateTeam";
import { TeamForm, teamSchema } from "@/validation/teams.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const EditTeam = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const { mutate: updateteam } = useUpdateTeam();
  const { data: team } = useGetOneTeam(Number(params.id));
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
    updateteam(
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
    if (team) {
      reset({
        name: team.name,
        country: team.country,
        coach: team.coach,
        logo: team.logo,
      });
    }
  }, [team, reset]);
  const handlePush = () => {
    setSuccess(false);
    push("/");
  };
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.card}>
            <h1>Изменение команды</h1>

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
                Изменить команду
              </button>
            </form>
          </div>
        </div>
      </div>
      {success && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <h2>✅ Команда успешно изменена!</h2>

            <p>Старая команда была успешно изменена.</p>

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

export default EditTeam;
