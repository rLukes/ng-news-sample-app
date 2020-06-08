export interface NewsApiResponse {
  totalResults: number;
  articles: {
    title: string;
    url: string;
  }[];
}
