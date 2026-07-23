"use client"
import { useEffect, useState } from "react";
import scss from "./edit-Player.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useUpdatePlayer } from "@/hooks/players/useUpdatePlayer";
import { useGetOnePlayer } from "@/hooks/players/useGetOnePlayer";
import { IPlayerBody } from "@/hooks/types/types";
import { useForm } from "react-hook-form";

const EditPlayer = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const { mutate: updateplayer } = useUpdatePlayer();
  const { data: player } = useGetOnePlayer(Number(params.id));
  const { push } = useRouter();
  const { handleSubmit, register, reset } = useForm<IPlayerBody>();
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
            </div>

            <div className={scss.inputGroup}>
              <label>Возраст</label>
              <input
                {...register("age")}
                type="number"
                placeholder="Введите возраст"
              />
            </div>

            <div className={scss.inputGroup}>
              <label>Зарплата</label>
              <input
                {...register("salary")}
                type="number"
                placeholder="Введите зарплату"
              />
            </div>

            <div className={scss.inputGroup}>
              <label>Фото игрока</label>
              <input
                {...register("image")}
                type="text"
                placeholder="Введите ссылку на изображение"
              />
            </div>

            <div className={scss.inputGroup}>
              <label>Команда</label>

              <select {...register("team_id", { valueAsNumber: true })}>
                <option value="">Выберите команду</option>
                <option value={1}>Real Madrid</option>
                <option value={2}>Barcelona</option>
                <option value={3}>Manchester City</option>
                <option value={4}>Liverpool</option>
              </select>
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
