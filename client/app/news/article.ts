export class Article {
  _id?: string;
  type?: string;
  source?: {
    id?: string,
    name?: string
  };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
  errorMessages?: [];
  successMessages?: [];
}
