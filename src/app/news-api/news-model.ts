export interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

export interface Article {
  title: string;
  url: string;
  source: {
    name: string;
  };
}
