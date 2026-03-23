import styles from "./admin.module.css";

export default function Admin() {
  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Админ панель</h1>
        <p>Управление соревнованиями и контентом</p>
      </header>

      <div className={styles.grid}>
        
        {/* Создать соревнование */}
        <div className={styles.card}>
          <h3>Создать соревнование</h3>
          <p>Добавь новый CTF и открой регистрацию</p>
          <button className={styles.primaryButton}>
            + Создать
          </button>
        </div>

        {/* Управление новостями */}
        <div className={styles.card}>
          <h3>Новости</h3>
          <p>Добавление и редактирование новостей</p>
          <button className={styles.secondaryButton}>
            Перейти
          </button>
        </div>

        {/* Все соревнования */}
        <div className={styles.card}>
          <h3>Соревнования</h3>
          <p>Просмотр и управление всеми CTF</p>
          <button className={styles.secondaryButton}>
            Открыть список
          </button>
        </div>

      </div>
    </div>
  );
}