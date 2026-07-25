"use client";
import Image from "next/image";
import scss from "./players.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetPlayers } from "@/hooks/players/useGetPlayers";
import { useDeletePlayer } from "@/hooks/players/useDeletePlayer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPlayerBody, IPlayerResult } from "@/hooks/types/types";

const Players = () => {
  const { data: players } = useGetPlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayerResult | null>(
    null,
  );
  const { mutate: deletePlayer } = useDeletePlayer();
  const { push } = useRouter();
  const handleDelete = () => {
    if (selectedPlayer === null) return;

    deletePlayer(selectedPlayer.id);

    setSelectedPlayer(null);
  };
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <h1>Игроки</h1>
          <div className={scss.tableWrapper}>
            {players?.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Фото</th>
                    <th>Игрок</th>
                    <th>Возраст</th>
                    <th>Зарплата</th>
                    <th>Команда</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {players?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt=""
                          className={scss.playerImage}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>${item.salary.toLocaleString()}</td>
                      <td className={scss.logotip}>
                        <img
                          src={
                            item.teamname === null
                              ? "https://s3-eu-west-1.amazonaws.com/inqaku-master/liveclublogos/25805_logo.jpg"
                              : item.logo
                          }
                          alt=""
                        />
                        {item.teamname === null ? "Free Agent" : item.teamname}
                      </td>
                      <td>
                        <div className={scss.actions}>
                          <button
                            onClick={() => push(`/edit-player/${item.id}`)}
                            className={scss.edit}
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => setSelectedPlayer(item)}
                            className={scss.delete}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={scss.empty}>
                <h4>К сожелению сейчас нету игроков!</h4>
                <button onClick={() => push("/create-player")}>
                  Добавить игроков
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedPlayer !== null && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <div className={scss.icon}>⚠️</div>

            <h2>Удалить игрока?</h2>

            <p>
              Вы действительно хотите удалить {selectedPlayer.name}?
              <br />
              Это действие нельзя отменить.
            </p>

            <div className={scss.buttons}>
              <button
                className={scss.cancel}
                onClick={() => setSelectedPlayer(null)}
              >
                Отмена
              </button>

              <button className={scss.deleteBtn} onClick={handleDelete}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Players;
