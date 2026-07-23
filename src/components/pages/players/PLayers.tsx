"use client";
import Image from "next/image";
import scss from "./players.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetPlayers } from "@/hooks/players/useGetPlayers";
import { useDeletePlayer } from "@/hooks/players/useDeletePlayer";
import { useRouter } from "next/navigation";

const Players = () => {
  const { data: players } = useGetPlayers();
  const { mutate: deletePlayer } = useDeletePlayer();
  const { push } = useRouter();
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
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={45}
                          height={45}
                          className={scss.playerImage}
                        />
                      </td>

                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>${item.salary.toLocaleString()}</td>
                      {/* <td>{item.team}</td> */}

                      <td>
                        <div className={scss.actions}>
                          <button
                            onClick={() => push(`/edit-player/${item.id}`)}
                            className={scss.edit}
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => deletePlayer(item.id)}
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
    </section>
  );
};

export default Players;
