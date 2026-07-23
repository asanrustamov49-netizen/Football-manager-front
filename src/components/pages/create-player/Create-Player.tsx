"use client";
import { useForm } from "react-hook-form";
import scss from "./create-player.module.scss";
import { IPlayerBody } from "@/hooks/types/types";
import { useCreatePlayer } from "@/hooks/players/useCreatePlayer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePlayer = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { mutate: createPlayer } = useCreatePlayer();
  const { push } = useRouter();
  const { handleSubmit, register, reset } = useForm<IPlayerBody>();
  const handleData = (data: IPlayerBody) => {
    createPlayer(data, {
      onSuccess: () => {
        setSuccess(true);
        reset();
      },
    });
  };

  const handlePush = () => {
    setSuccess(false);
    push("/players");
  };

  return (
    <section className={scss.createPlayer}>
      <div className={scss.container}>
        <div className={scss.card}>
          <h1>Добавление игрока</h1>

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
              Добавить игрока
            </button>
          </form>
        </div>
      </div>
      {success && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <h2>✅ Игрок успешно создан!</h2>

            <p>Новый игрок был успешно добавлен.</p>

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

export default CreatePlayer;
