import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useContext, useState, useEffect } from "react";
import { Context } from "@/App";
import { observer } from "mobx-react-lite";

import {
  NewsIcon,
  CompetitionsIcon,
  TeamIcon,
  AdminIcon,
  ProfileIcon
} from "@/assets/icons/Navbar";

function Navbar() {
  const location = useLocation();
  const { store } = useContext(Context);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path);
  }, [location.pathname]);

  const isAdmin = true;
  const isTeam = true;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        <Link
          to="/"
          className={styles.navbarLogo}
          onClick={() => setActiveTab("news")}
        >
          ctfd
        </Link>

        <div className={styles.navbarContainer}>
          <Link
            to="/news"
            className={`${styles.userMenu} ${
              activeTab === "news" || activeTab === ""
                ? styles.activeTab
                : styles.nonActiveTab
            }`}
            onClick={() => setActiveTab("news")}
          >
            <NewsIcon />
            <span className={styles.navbarLink}>Новости</span>
          </Link>

          <Link
            to="/competitions"
            className={`${styles.userMenu} ${
              activeTab === "competitions"
                ? styles.activeTab
                : styles.nonActiveTab
            }`}
            onClick={() => setActiveTab("competitions")}
          >
            <CompetitionsIcon />
            <span className={styles.navbarLink}>Соревнования</span>
          </Link>

          {isTeam && (
            <Link
              to="/team"
              className={`${styles.userMenu} ${
                activeTab === "team" ? styles.activeTab : styles.nonActiveTab
              }`}
              onClick={() => setActiveTab("team")}
            >
              <TeamIcon />
              <span className={styles.navbarLink}>Команда</span>
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className={`${styles.userMenu} ${
                activeTab === "admin" ? styles.activeTab : styles.nonActiveTab
              }`}
              onClick={() => setActiveTab("admin")}
            >
              <AdminIcon />
              <span className={styles.navbarLink}>Панель админа</span>
            </Link>
          )}

          {store.isLoading ? (
            <div>Загрузка</div>
          ) : (
            <Link
              to="/profile"
              className={`${styles.userMenu} ${
                activeTab === "profile" ? styles.activeTab : styles.nonActiveTab
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <ProfileIcon />
              <span className={styles.navbarLink}>Профиль</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default observer(Navbar);
