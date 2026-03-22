import type { CompetitionFilter } from "./useCompetitions";

export interface FilterOption {
  value: CompetitionFilter;
  label: string;
  count?: number;
}

export const competitionFilters: FilterOption[] = [
  { value: "all", label: "Все соревнования" },
  { value: "upcoming", label: "Предстоящие" },
  { value: "active", label: "Активные" },
  { value: "completed", label: "Завершённые" },
];
