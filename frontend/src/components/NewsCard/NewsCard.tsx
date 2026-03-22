import styles from "./NewsCard.module.css";

export interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  date: string;
  type: "past" | "upcoming";
  compact?: boolean;
}

export default function NewsCard({
  id,
  title,
  content,
  image,
  date,
  type,
  compact = false,
  onNewsClick,
}: NewsCardProps & { onNewsClick?: (id: number) => void }) {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU");

  const handleClick = () => {
    onNewsClick?.(id);
  };

  if (compact) {
    return (
      <div className={styles.newsCardCompact} onClick={handleClick}>
        <div className={styles.newsCardCompactContent}>
          <h3 className={styles.newsCardCompactTitle}>{title}</h3>
          <p className={styles.newsCardCompactDate}>{formattedDate}</p>
        </div>
        <span className={`${styles.newsType} ${styles[type]}`}>
          {type === "upcoming" ? "Предстоящее" : "Прошедшее"}
        </span>
      </div>
    );
  }

  return (
    <article className={styles.newsCard} onClick={handleClick}>
      {image && (
        <div className={styles.newsCardImage}>
          <img src={image} alt={title} />
        </div>
      )}
      <div className={styles.newsCardContent}>
        <div className={styles.newsCardHeader}>
          <h3 className={styles.newsCardTitle}>{title}</h3>
        </div>
        <p className={styles.newsCardDate}>{formattedDate}</p>
        <p className={styles.newsCardText}>{content}</p>
      </div>
    </article>
  );
}
