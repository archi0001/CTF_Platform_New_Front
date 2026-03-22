import CompetitionCard from "@/components/CompetitionCard/CompetitionCard";
import { useCompetitions } from "@/components/CompetitionCard/useCompetitions";
import { competitionFilters } from "@/components/CompetitionCard/competitionFilters";
import styles from "./competitons.module.css";

export default function Competitions() {
  const { competitions, filter, setFilter } = useCompetitions();

  return (
    <div className={styles.competitionsPage}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>Соревнования</span>
        <span className={styles.headerDescription}>
          Участвуй в CTF соревнованиях и улучшайте свои навыки{" "}
          <span className={styles.headerDescriptionBlue}>
            кибербезопасности
          </span>
        </span>
      </header>
      <div className={styles.filters}>
        {competitionFilters.map((filterOption) => (
          <button
            key={filterOption.value}
            className={`${styles.filterButton} ${
              filter === filterOption.value ? styles.active : ""
            }`}
            onClick={() => setFilter(filterOption.value)}
          >
            {filterOption.label}
          </button>
        ))}
      </div>
      <div className={styles.competitionsGrid}>
        {competitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
