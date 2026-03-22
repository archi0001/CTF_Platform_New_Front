import axios from "axios";

export type NewsItem = {
  id: number;
  data: {
    title: string;
    text: string;
    image?: string | "";
    created_at: string;
    status: "past" | "upcoming";
  };
};

export type Competition = {
  id: number;
  data: {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    member_count: number;
    image_path: string;
  };
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export async function getTeam(teamId: number) {
  const response = await axios.get(`/team?team_id=${teamId}`);
  return response.data;
}

export async function getUser(userId: number) {
  const response = await axios.get(`/user?user_id=${userId}`);
  return response.data;
}

export async function getNews(): Promise<NewsItem[]> {
  const response = await axios.get("/news");
  return response.data;
}

export async function getCompetitions(): Promise<Competition[]> {
  const response = await axios.get("/events");
  return response.data;
}
