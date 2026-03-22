import { Link } from "react-router-dom";
import styles from "./CompetitionCard.module.css";
import type { Competition } from "@/api";

import ParticipantsIcon from "@/assets/icons/ParticipantsIcon";

import { useNavigate } from "react-router-dom";

interface Props {
  competition: Competition;
}

export const getStatusInfo = (endTime: string, startTime: string) => {
  const dateNow = new Date();
  let endTimeDate = new Date(endTime);
  let startTimeDate = new Date(startTime);
  if (startTimeDate < dateNow && dateNow < endTimeDate) {
    return { label: "Активно", status: "active", className: styles.active };
  } else {
    if (startTimeDate > dateNow) {
      return {
        label: "Предстоящее",
        status: "upcoming",
        className: styles.upcoming,
      };
    } else {
      return {
        label: "Завершено",
        status: "completed",
        className: styles.completed,
      };
    }
  }
};

export default function CompetitionCard({ competition }: Props) {
  const navigate = useNavigate();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ru-RU");
  const statusInfo = getStatusInfo(
    competition.data.end_at,
    competition.data.start_at
  );
  const isCompleted = statusInfo.status === "completed";
  const canRegister = statusInfo.status !== "completed";
  const canParticipate = statusInfo.status !== "completed";

  return (
    <div className={styles.competitionCard}>
      <header className={styles.cardHeader}>
        <div className={styles.title}>
          <span className={styles.titleLabel}>{competition.data.name}</span>
          <div className={styles.titleDescription}>
            {competition.data.description}
          </div>
        </div>
        <span className={`${styles.status} ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
      </header>

      <div className={styles.dates}>
        <div className={styles.dateItem}>
          <span className={styles.dateLabel}>Начало:</span>
          <span className={styles.dateValue}>
            {formatDate(competition.data.start_at)}
          </span>
        </div>
        <div className={styles.dateItem}>
          <span className={styles.dateLabel}>Конец:</span>
          <span className={styles.dateValue}>
            {formatDate(competition.data.end_at)}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        {canRegister ? (
          <button
            className={`${styles.registerButton} ${styles.registerButtonActive}`}
            onClick={() => {
              navigate(`/competitions/${competition.id}`);
            }}
          >
            Зарегистрироваться
          </button>
        ) : (
          <button className={`${styles.registerButton} ${styles.nonactive}`}>
            Зарегистрироваться
          </button>
        )}
        {canParticipate ? (
          <button
            className={`${styles.participateButton} ${styles.participateButtonActive}`}
            onClick={() => {
              navigate(`/competitions/${competition.id}`);
            }}
          >
            Участвовать
          </button>
        ) : (
          <button className={`${styles.participateButton} ${styles.nonactive}`}>
            Участвовать
          </button>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.participants}>
          <ParticipantsIcon />
          Участников: {competition.data.member_count}
        </div>
        {isCompleted && (
          <Link
            to={`/competitions/${competition.id}`}
            className={styles.resultsLink}
          >
            Результаты
          </Link>
        )}
      </div>
    </div>
  );
}
