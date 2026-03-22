import { useState, useEffect } from "react";
import type { Competition } from "@/api";
import { getCompetitions } from "@/api";
import { getStatusInfo } from "./CompetitionCard";

export type CompetitionFilter = "all" | "upcoming" | "active" | "completed";

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [filter, setFilter] = useState<CompetitionFilter>("all");

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const data = await getCompetitions();
      setCompetitions(data);
    } catch (err) {
      console.error("Error loading competitions:", err);
    }
  };

  const filteredCompetitions = competitions.filter((competition) => {
    if (filter === "all") return true;
    return (
      getStatusInfo(competition.data.end_at, competition.data.start_at)
        .status === filter
    );
  });

  return {
    competitions: filteredCompetitions,
    filter,
    setFilter,
  };
}
