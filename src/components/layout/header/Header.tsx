import Link from "next/link";
import scss from "./header.module.scss";

const Header = () => {
  return (
    <header className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <h2>Foot Manager</h2>
          <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/">Teams</Link>
            <Link href="/players">Players</Link>
            <Link href="/create-team">Create Team</Link>
            <Link href="/create-player">Create Player</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
