import { useState, useEffect } from "react";
import type { Competition } from "@/api";
import { getCompetitions } from "@/api";
import { getStatusInfo } from "./CompetitionCard";

export type CompetitionFilter = "all" | "upcoming" | "active" | "completed";

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [filter, setFilter] = useState<CompetitionFilter>("all");

  const mockCompetitions = [
    {
      id: 1,
      data: {
        name: "CTF Moscow 2026",
        description: "Большой оффлайн CTF в Москве",
        start_at: "2026-04-10",
        end_at: "2026-04-12",
        image: "https://picsum.photos/400/200?1",
      },
    },
    {
      id: 2,
      data: {
        name: "CyberBattle Finals",
        description: "Финал крупнейшего онлайн CTF",
        start_at: "2026-03-01",
        end_at: "2026-03-02",
        image: "https://picsum.photos/400/200?2",
      },
    },
    {
      id: 3,
      data: {
        name: "CyberBattle Finals",
        description: "Финал крупнейшего онлайн CTF",
        start_at: "2026-03-01",
        end_at: "2026-03-02",
        image: "https://picsum.photos/400/200?2",
      },
    },
    {
      id: 4,
      data: {
        name: "CyberBattle Finals",
        description: "Финал крупнейшего онлайн CTF",
        start_at: "2026-03-01",
        end_at: "2026-03-30",
        image: "https://picsum.photos/400/200?2",
      },
    },
  ];

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

  // const filteredCompetitions = competitions.filter((competition) => {
  const filteredCompetitions = mockCompetitions.filter((competition) => {
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
