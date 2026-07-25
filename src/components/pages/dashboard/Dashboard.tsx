"use client";
import { useGetStatistics } from "@/hooks/useGetStatistics";
import scss from "./dashboard.module.scss";

const Dashboard = () => {
  const { data: stats } = useGetStatistics();
  console.log("STATISTICS:", JSON.stringify(stats, null, 2));

  return (
    <section className={scss.dashboard}>
      <div className="container">
        <h1 className={scss.title}>📊 Статистика</h1>

        <div className={scss.cards}>
          <div className={scss.card}>
            <span>👥</span>
            <h3>Всего игроков</h3>
            <h2>{stats?.data.totalPlayers}</h2>
          </div>
          <div className={scss.card}>
            <span>💰</span>
            <h3>Средняя зарплата</h3>
            <h2>${stats?.data.averageSalary.toLocaleString()}</h2>
          </div>
          <div className={scss.card}>
            <span>👶</span>
            <h3>Самый молодой</h3>
            <p>{stats?.data.youngestPlayer?.name}</p>
            <h2>{stats?.data.youngestPlayer?.age} лет</h2>
          </div>
          <div className={scss.card}>
            <span>🏆</span>
            <h3>Всего команд</h3>
            <h2>{stats?.data.totalTeams}</h2>
          </div>
          <div className={scss.card}>
            <span>🔥</span>
            <h3>Максимальная зарплата</h3>
            <h2>${stats?.data.highestSalary.toLocaleString()}</h2>
          </div>

          <div className={scss.card}>
            <span>👴</span>
            <h3>Самый возрастной</h3>
            <p>{stats?.data.oldestPlayer?.name}</p>
            <h2>{stats?.data.oldestPlayer?.age} лет</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
