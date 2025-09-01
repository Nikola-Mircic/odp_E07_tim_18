import axios from "axios";

export type News = {
    id: number;
    tekst: string;
    naslov: string;
    br_pregleda: number;
};

interface NewsResponse {
  success: boolean;
  data: News[];
}

export function getAllNews(): Promise<News[]> {
  const news = axios
		.get<NewsResponse>("http://localhost:8080/api/v1/vesti/najpopularnije/")
		.then((response) => {
			return response.data;
		}).then((newsResponse) => newsResponse.data);

  return news;
};