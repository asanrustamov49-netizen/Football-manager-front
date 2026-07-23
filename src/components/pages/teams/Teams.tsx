"use client";
import Image from "next/image";
import scss from "./teams.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetTeams } from "@/hooks/teams/useGetTeams";
import { useDeleteTeam } from "@/hooks/teams/useDeleteTeam";
import { useRouter } from "next/navigation";

const Teams = () => {
  const { data: teams } = useGetTeams();
  const { mutate: deleteTeam } = useDeleteTeam();
  const { push } = useRouter();
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
                        <Image
                          src={item.logo}
                          alt={item.name}
                          width={45}
                          height={45}
                          className={scss.logo}
                        />
                      </td>

                      <td>{item.name}</td>
                      <td>{item.country}</td>
                      <td>{item.coach}</td>
                      <td>{item.players}</td>

                      <td>
                        <div className={scss.actions}>
                          <button
                            onClick={() => push(`/edit-team/${item.id}`)}
                            className={scss.edit}
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => deleteTeam(item.id)}
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
    </section>
  );
};

export default Teams;
