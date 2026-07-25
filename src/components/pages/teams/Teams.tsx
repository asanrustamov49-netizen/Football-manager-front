"use client";
import Image from "next/image";
import scss from "./teams.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetTeams } from "@/hooks/teams/useGetTeams";
import { useDeleteTeam } from "@/hooks/teams/useDeleteTeam";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ITeamResult } from "@/hooks/types/types";

const Teams = () => {
  const { data: teams } = useGetTeams();
  const [selectedTeam, setSelectedTeam] = useState<ITeamResult | null>(null);
  const { mutate: deleteTeam } = useDeleteTeam();
  const { push } = useRouter();
  const handleDelete = () => {
    if (selectedTeam === null) return;

    deleteTeam(selectedTeam.id);

    setSelectedTeam(null);
  };
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <h1>Команды</h1>
          <div className={scss.tableWrapper}>
            {teams?.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Логотип</th>
                    <th>Команда</th>
                    <th>Страна</th>
                    <th>Тренер</th>
                    <th>Игроков</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {teams?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.logo} alt="" className={scss.logo} />
                      </td>

                      <td>{item.name}</td>
                      <td>{item.country}</td>
                      <td>{item.coach}</td>
                      <td>{item.players_count}</td>

                      <td>
                        <div className={scss.actions}>
                          <button
                            onClick={() => push(`/edit-team/${item.id}`)}
                            className={scss.edit}
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => setSelectedTeam(item)}
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
                <h4>К сожелению сейчас нету команд!</h4>
                <button onClick={() => push("/create-team")}>
                  Добавить команду
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedTeam !== null && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <div className={scss.icon}>⚠️</div>

            <h2>Удалить команду?</h2>

            <p>
              Вы действительно хотите удалить {selectedTeam?.name}?
              <br />
              Это действие нельзя отменить.
            </p>

            <div className={scss.buttons}>
              <button
                className={scss.cancel}
                onClick={() => setSelectedTeam(null)}
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

export default Teams;
