import styles from "./team.module.css";

interface Member {
  id: number;
  name: string;
  role: string;
  email?: string;
  telegram?: string;
  avatar?: string;
}

export default function Team() {
  const mockTeam: Member[] = [
    {
      id: 1,
      name: "Иван Иванов",
      role: "Team Lead",
      email: "ivan@example.com",
      telegram: "@ivan",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Алексей Петров",
      role: "Reverse Engineer",
      telegram: "@alex",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Мария Смирнова",
      role: "Web Exploitation",
      email: "maria@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <div className={styles.teamPage}>
      <header className={styles.header}>
        <h1>Команда</h1>
        <p>Участники команды и их контакты</p>
      </header>

      <div className={styles.grid}>
        {mockTeam.map((member) => (
          <div key={member.id} className={styles.card}>
            
            <div className={styles.avatarWrapper}>
              <img src={member.avatar} alt="" />
            </div>

            <div className={styles.info}>
              <h3>{member.name}</h3>
              <span className={styles.role}>{member.role}</span>
            </div>

            <div className={styles.contacts}>
              {member.email && (
                <span>📧 {member.email}</span>
              )}
              {member.telegram && (
                <span>💬 {member.telegram}</span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}